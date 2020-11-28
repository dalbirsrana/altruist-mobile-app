import React from "react";
import {SvgXml} from "react-native-svg";

export default function SvgComponent() {

    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:#e89b8d;stroke-linejoin:round;}</style></defs><g id="Filter"><polygon class="cls-1" points="1.45 12.51 22.55 0.88 22.55 23.13 1.45 12.51"/></g></svg>`;

    const SvgImage = () => <SvgXml xml={svgMarkup} width="200px" height="200"/>;

    return <SvgImage/>;
}