declare module '*.png' {
    const value: any;
    export default value;
  }
  declare module '*.jpg' {
    const value: any;
    export default value;
  }

  interface Services {
    id:number,
    service_name:string,
    service_image:string,
  }

  interface Name {
    id?:number,
    fname?:string,
    lname?:string,
    image?:string
  }

  interface RootState {
    user: {
      userData: any;
    };
    auth: {
      authToken : any;
    }; provider : {
      providerData : any
    }
  }