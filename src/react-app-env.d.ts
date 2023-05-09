/// <reference types="react-scripts" />

declare module "*.lazy.less" {
    const styLoader: {
      use(): void;
      unuse(): void;
    };
    export default styLoader;
  }