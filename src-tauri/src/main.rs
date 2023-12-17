// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod keycode;
mod play_sound;
mod start;

use tauri::api::dialog::FileDialogBuilder;
use tokio::sync::{
    mpsc::{self},
    Mutex,
};

use serde::{Deserialize, Serialize};
use serde_json;

// #[derive(Debug)]
struct AsyncProcInputTx {
    inner: Mutex<mpsc::Sender<UserChangeAction>>,
}

// mod expected_result;

#[derive(Debug)]
enum UserChangeAction {
    Arguments(String),
    Vol(u16),
}

#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse {
    success: bool,
    data: Option<String>,
    error: Option<String>,
}

#[tauri::command]
async fn set_track(arg: &str, state: tauri::State<'_, AsyncProcInputTx>) -> Result<String, String> {
    let batman = state.inner.lock().await;
    let resss = match batman
        .send(UserChangeAction::Arguments(arg.to_string()))
        .await
    {
        Ok(_) => ApiResponse {
            success: true,
            data: None,
            error: None,
        },
        Err(error) => ApiResponse {
            success: false,
            data: None,
            error: Some(error.to_string()),
        },
    };

    // Serialize the ApiResponse to a JSON string
    let json_string = serde_json::to_string(&resss).unwrap();

    // You can now return the JSON string or send it over a network, etc.
    Ok(json_string)
}

#[tauri::command]
async fn set_vol(vol: &str, state: tauri::State<'_, AsyncProcInputTx>) -> Result<String, String> {
    let batman = state.inner.lock().await;
    let resss = match batman
        .send(UserChangeAction::Vol(
            vol.parse::<u16>().expect("error in str to u16"),
        ))
        .await
    {
        Ok(_) => ApiResponse {
            success: true,
            data: None,
            error: None,
        },
        Err(error) => ApiResponse {
            success: false,
            data: None,
            error: Some(error.to_string()),
        },
    };

    // Serialize the ApiResponse to a JSON string
    let json_string = serde_json::to_string(&resss).unwrap();

    // You can now return the JSON string or send it over a network, etc.
    Ok(json_string)
}

#[tauri::command]
async fn add_track() -> Result<String, String> {
    let (tx, rx) = std::sync::mpsc::channel();
    let d = FileDialogBuilder::new().pick_folder(move |f| {
        tx.send(String::from(f.unwrap().to_string_lossy())).unwrap();
    });
    let file_path = rx.recv().unwrap();

    let check = check_path(file_path);
    return Ok(serde_json::to_string(&check).unwrap());
}

fn check_path(file_path: String) -> ApiResponse {
    if tauri::api::dir::is_dir(file_path.clone()).expect("Error in checking dir") {
        let mut has_config_file = false;
        let mut has_wav_music_file = false;
        for file in tauri::api::dir::read_dir(file_path.clone(), false)
            .expect("Error_in_reading dir content")
        {
            if file.name.clone().unwrap().contains("config.json") {
                has_config_file = true;
            } else if file.name.clone().unwrap().contains(".wav") {
                has_wav_music_file = true;
            }

            if has_wav_music_file && has_config_file {
                return ApiResponse {
                    success: true,
                    data: Some(file_path.to_string()),
                    error: None,
                };
            }
        }

        if !has_config_file {
            return ApiResponse {
                success: false,
                data: None,
                error: Some("Dir Not Have Config.json file".to_string()),
            };
        } else if !has_wav_music_file {
            return ApiResponse {
                success: false,
                data: None,
                error: Some("Only Support .wav Sound".to_string()),
            };
        } else {
            unreachable!();
        };
    } else {
        return ApiResponse {
            success: false,
            data: None,
            error: Some("No Dir Found".to_string()),
        };
    }
}

fn main() {
    let (async_proc_input_tx, async_proc_input_rx) = mpsc::channel(500);
    // let (async_proc_output_tx, mut async_proc_output_rx) = mpsc::channel(1);

    tauri::Builder::default()
        .manage(AsyncProcInputTx {
            inner: Mutex::new(async_proc_input_tx),
        })
        .invoke_handler(tauri::generate_handler![set_track, set_vol, add_track])
        .setup(|app| {
            (tauri::async_runtime::spawn(async move {
                start::rustyvibes::start_rustyvibes(async_proc_input_rx).await
            }));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
