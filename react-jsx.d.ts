declare module React {
    interface TopLevelAPI {
        jsx: (jsx?: string) => React.ReactElement<any>;
    }
}