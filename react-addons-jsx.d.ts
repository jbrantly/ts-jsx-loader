// This file is intended to be used with the DefinitelyTyped React v0.13 addons definition (react-addons.d.ts)

declare module "react/addons" {
		function jsx(jsx?: string): ReactElement<any>;
		function __spread(...args: any[]): any; // for JSX Spread Attributes
}
