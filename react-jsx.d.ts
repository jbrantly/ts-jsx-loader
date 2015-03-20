// This file is intended to be used with the DefinitelyTyped React v0.13 definition (react.d.ts)

declare module "react" {
		function jsx(jsx?: string): ReactElement<any>;
		function __spread(...args: any[]): any; // for JSX Spread Attributes
}
