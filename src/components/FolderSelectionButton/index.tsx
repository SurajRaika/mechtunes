import { useState } from 'preact/hooks';
import { Button } from '@geist-ui/core'
import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api/tauri";

// Open a selection dialog for directories

const FolderSelectionButton = () => {

  const [selected_file, set_file] = useState(null);
  let name="/home/surajraika/Downloads/someSound/someosund";

  async function handleFolderSelect() {
    set_file(await invoke("set_track",{name:name}))
  }

  return (
    <div style="margin-top:2rem;" class="center">
      <Button onclick={handleFolderSelect} type="secondary" ghost >Select SoundTrack Folder</Button>
    </div>
  );
};

export default FolderSelectionButton;
