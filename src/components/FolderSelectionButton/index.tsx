import { useState } from 'preact/hooks';
import { Button } from '@geist-ui/core'
import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api/tauri";

// Open a selection dialog for directories

const FolderSelectionButton = () => {
  async function handleFolderSelect() {
    console.log("add");

    invoke("add_track").then((message: unknown) => {

      if (typeof message == "string") {
        interface ApiResponse {
          success: Boolean,
          data?: string | null,
          error?: string | null
        };

        let responce: ApiResponse = JSON.parse(message);
        if (responce.success) {

        }
      } else {
        console.error("Unexpected message type:", typeof message);
      }






    }).catch((n) => {
      console.log(n);
    });


  }

  return (
    <div style="margin-top:2rem;" class="center">
      <Button onclick={handleFolderSelect} type="secondary" ghost >Select SoundTrack Folder</Button>
    </div>
  );
};

export default FolderSelectionButton;
