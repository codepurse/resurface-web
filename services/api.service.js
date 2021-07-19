module.exports = appglobal = {
  api: {
    // Localhost
    base_api: "http://localhost:8000",
    // //// Old
    // base_api:"http://resurface-load-balancer-973411924.ap-southeast-1.elb.amazonaws.com",
    // Production
    // base_api:"http://app.resurfacehub.com/ ",
    // Staging
    // base_api:"http://staging.resurfacehub.com/",

    login: "/api/auth/login",
    register:"/api/auth/signup",
    logout:"/api/auth/logout",
    forgot_password:"/api/auth/forgot_password",
    reset_password:"/api/auth/reset",
    get_all_clinicians:"/api/auth/clinicians",
    add_clinician:"/api/auth/clinicians",
    delete_clinician:"/api/auth/clinicians/",
    update_clinician:"/api/auth/clinicians/",
    get_events: "/api/auth/events",
    add_event:"/api/auth/events",
    delete_event:"/api/auth/events/",
    update_event:"/api/auth/events/",
    add_location:"/api/auth/locations ",
    get_all_location:"/api/auth/locations ",
    add_family:"/api/auth/families"
  },
};