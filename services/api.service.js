module.exports = appglobal = {
  api: {
    base_api: "http://localhost:8000",
    // base_api:"http://resurface-staging-api-alb-1566685984.ap-southeast-1.elb.amazonaws.com",
    login: "/api/auth/login",
    register:"/api/auth/signup",
    logout:"/api/auth/logout",
    forgot_password:"/forgot_password",
    reset_password:"/reset",
    get_all_clinicians:"/api/auth/clinicians",
    delete_clinician:"/api/auth/clinicians/"
  },
};