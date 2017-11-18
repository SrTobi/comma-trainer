
declare module "@knod/sbd" {
    interface SBTOptions {
        newline_boundaries?: boolean,
        html_boundaries?: boolean,
        html_boundaries_tags?: string[],
        sanitize?: boolean,
        allowed_tags?: boolean,
        abbreviations?: string[]
    }

    interface SBTWordOptions extends SBTOptions {
        parse_type: "words"
    }

    interface SBTStringOptions extends SBTOptions {
        parse_type: "strings"
    }

    function sentences(text: string, options?: SBTStringOptions | boolean): string[];
    function sentences(text: string, options: SBTWordOptions): string[][]
}