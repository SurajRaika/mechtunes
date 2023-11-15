import { Button, Page, Text, Grid, Card } from '@geist-ui/core'
import { Github, Power, ChevronLeft, ChevronRight, Volume1, Volume2 } from '@geist-ui/icons'
import Slider from 'preact-material-components/Slider';
import 'preact-material-components/Slider/style.css';
import { useState } from "preact/hooks";

import  FolderSelectionButton  from "./components/FolderSelectionButton";


export default function AppComponent() {
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
                    <Slider onInput={() => {
                        console.log("dsa");
                    }} step={2} value={10} max={100} />
                </div>
                <button>
                    <Volume2></Volume2>
                </button>
            </div>
         
            <FolderSelectionButton>d</FolderSelectionButton>
        </main>
    );
}