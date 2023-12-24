// sum.test.js
import { describe, expect, test } from 'vitest'
import { set_track ,intialising_sound_track_data} from './Backend_Api_call'
import { BaseDirectory, writeTextFile, readDir, readTextFile } from '@tauri-apps/api/fs';



function add(num1:number,num2:number) {
      return num1+num2;
}


test('Testing Reading Base Dir', () => {
  async function reading_soundPack_dir():Promise<Boolean> {
    const files = await readDir('soundPack/', { dir: BaseDirectory.Resource });
    let have_Resource_track:boolean=false;
    
    files.forEach(element => {
      if (element.name=="super_paper_mario_v1") {
        have_Resource_track=true;
      }
    });
    return have_Resource_track;
  };

  expect( reading_soundPack_dir()).toBe(true)
});


// describe('writeTextFile',()=>{
  
//   test("Writing Dir Data into app_data.json",async ()=>{
//     intialising_sound_track_data().then((ok)=>{
//       console.log(ok);
      
//     })
//   });


// })

