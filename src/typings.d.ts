/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module '*.json' {
  class json implements ArrayLike<{}> {
    length: number;
    [n: number]: any;
  }
  export default json;
}
