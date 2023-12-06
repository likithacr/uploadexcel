export const environment : { [key: string]: any } = {
  production: false,
  test: "DEV",
  region: "us-east-1",
  // poolId: 'us-east-1_yjacun8kh', //Cognito User Pool
  // clientId: '63gfapq7rc0aprb3bu97qblung', //Cognito User Pool App
  // clientId: '39q6j6euph5il8musshcp1nh47', //Cognito User Pool App
  // api: "https://dbil5js3z7.execute-api.us-east-1.amazonaws.com/assetmanagement/getdata",
  api: "https://fdmhvlnrsh.execute-api.us-east-1.amazonaws.com/devassetmgmt/getdata",

  authData: {
    ClientId: "WTS OPS Center_prod",
    //ClientId: '39q6j6euph5il8musshcp1nh47',
    AppWebDomain: "auth.watertechnologies.com",
    TokenScopesArray: ["openid"],
    RedirectUriSignIn: "http://localhost:4200/profile", // Callback URL
    RedirectUriSignOut: "http://localhost:4200/profile", // Redirect logout URL
  },
  releaseNo: "Dev-V 4.0.0",
  releaseDate: "03-Aug-2023",
};
