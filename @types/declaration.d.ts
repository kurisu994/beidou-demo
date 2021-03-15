declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}

declare module '*.png' {
  const png: string;
  export default png;
}
