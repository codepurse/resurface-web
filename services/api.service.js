module.exports = appglobal = {
  api: {
    // base_api: "http://localhost:8000",
    base_api:"http://resurface-load-balancer-973411924.ap-southeast-1.elb.amazonaws.com",
    login: "/api/auth/login",
    register:"/api/auth/signup",
    logout:"/api/auth/logout",
    forgot_password:"/api/auth/forgot_password",
    reset_password:"/api/auth/reset",
    get_all_clinicians:"/api/auth/clinicians",
    add_clinician:"/api/auth/clinicians",
    delete_clinician:"/api/auth/clinicians/",
    get_events: "/api/auth/events",
    add_event:"/api/auth/events",
    delete_event:"/api/auth/events/",
    update_event:"/api/auth/events/",
  },
};