// CSS副作用インポート用の型宣言
declare module '*.css' {
  const content: any;
  export default content;
}

// CSS modules用の型宣言
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// SCSS用の型宣言
declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
