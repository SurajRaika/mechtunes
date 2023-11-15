import { invoke } from "@tauri-apps/api/tauri";

export function set_track(track_name:String) {
    await invoke("set_track", { name });
}