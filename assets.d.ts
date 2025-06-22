// assets.d.ts
declare module '*.jpg' {
    const value: { uri: string };
    export = value;
  }
  
  declare module '*.jpeg' {
    const value: { uri: string };
    export = value;
  }
  
  declare module '*.png' {
    const value: { uri: string };
    export = value;
  }
  
  declare module '*.gif' {
    const value: { uri: string };
    export = value;
  }
  
  declare module '*.webp' {
    const value: { uri: string };
    export = value;
  }
  
  declare module '*.svg' {
    const value: string;
    export default value;
  }
  