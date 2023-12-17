import { Button, Page, Text, Grid, Card } from '@geist-ui/core'
import { Github, Power, ChevronLeft, ChevronRight, Volume1, Volume2 } from '@geist-ui/icons'
import Slider from 'preact-material-components/Slider';
import { invoke } from "@tauri-apps/api/tauri";

import 'preact-material-components/Slider/style.css';
import { useState } from "preact/hooks";

import FolderSelectionButton from "./components/FolderSelectionButton";
import { as } from 'vitest/dist/reporters-5f784f42.js';


export default function AppComponent() {

    async function set_vol(volume: Number) {
        console.log(`Volume${volume}`);

        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        invoke("set_vol", { vol: `${volume}` }).then((message) => {
            console.log(message)
        }).catch((n) => {
            console.log(n);
        });
    }




    return (
        <main>

            <header>
                <Button iconRight={'⌘ K'} auto scale={2 / 3} />
                <div class="header-menu-right-side" >
                    <Button auto scale={2 / 3} px={0.6} ><Text p>中</Text></Button>
                    <Button iconRight={<Github />} auto scale={2 / 3} px={0.6} />
                    <Button style="  " iconRight={<Power />} auto scale={2 / 3} px={0.6} />

                </div>
            </header>
            <div id="main-wrapper" >

                <div id="mackTunes-box" >
                    <text id="mackTunes-text">MackTunes</text>
                </div>

            </div>

            <div class="controller">
                <button>
                    <ChevronLeft size="40"></ChevronLeft>
                </button>

                <div style="width:100%; text-align: center;">Opera Gx KeySound</div>
                <button>
                    <ChevronRight size="40"></ChevronRight>
                </button>
                <button>
                    <Volume1></Volume1>
                </button>
                <div style="width:100%; "  >
                    <Slider onInput={(Number: any) => {
                        set_vol(Number.target.getAttribute("aria-valuenow"));
                    }} step={2} value={10} max={100} />
                </div>
                <button>
                    <Volume2></Volume2>
                </button>
            </div>

            <FolderSelectionButton></FolderSelectionButton>
        </main>
    );
}
