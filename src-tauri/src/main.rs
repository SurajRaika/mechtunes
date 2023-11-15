// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod keycode;
mod play_sound;
mod start;
use std::{sync::Mutex, thread::spawn};
use tauri::State;
use tokio;
struct Rustyvibes {
    running: Mutex<bool>,
}

// mod expected_result;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn set_track(name: &str, state: State<Rustyvibes>) -> String {
    let mut running = state.running.lock().unwrap();
    let sound_track = String::from(name);
    if !*running {
        tokio::spawn(async move {
            start::rustyvibes::start_rustyvibes(sound_track, 90);
        });
        *running = true;
    }

    format!("Activated")
}

fn main() {
    tauri::Builder::default()
        .manage(Rustyvibes {
            running: Mutex::new(false),
        })
        .invoke_handler(tauri::generate_handler![set_track])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
