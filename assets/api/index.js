const api = {
    skilent_api_url: "https://api-beta.skilent.com/api/",

    guestJobs: "https://api-beta.skilent.com/api/guest/jobs",
    guestJobDesc: "https://api-beta.skilent.com/api/guest/jobs/{id}",

    signin: "https://api-beta.skilent.com/api/auth/sign-in",
    sign_out: "https://api-beta.skilent.com/api/auth/sign-out",

    signup: "https://api-beta.skilent.com/api/auth/sign-up/candidate",
    signup_confirm: "https://api-beta.skilent.com/api/auth/confirmation",
    tokan_verify: "https://api-beta.skilent.com/api/auth/verify",

    forgot_password: "https://api-beta.skilent.com/api/auth/password/recovery",
    passwordUpdate: "https://api-beta.skilent.com/api/auth/password/update",
    profile_password_update: "https://api-beta.skilent.com/api/profile/password",

    candidate_jobs: "https://api-beta.skilent.com/api/candidate/jobs",
    candidate_apply_job: "https://api-beta.skilent.com/api/candidate/jobs/",
    candidate_accept_job: "https://api-beta.skilent.com/api/candidate/jobs/",
    candidate_save_job: "https://api-beta.skilent.com/api/favorite/job/",
    candidate_share_job: "https://api-beta.skilent.com/api/candidate/recommendations/create",
    candidate_profile_avtar: "https://api-beta.skilent.com/api/profile/avatar",

    // dashboard_api_0: "https://api-beta.skilent.com/api/candidate-dashboard/assigned-jobs?range=year", 
    dashboard_api_0: "https://api-beta.skilent.com/api/candidate/jobs?scope=assigned",
    // dashboard_api_1: "https://api-beta.skilent.com/api/candidate-dashboard/applied-jobs?range=year",
    dashboard_api_1: "https://api-beta.skilent.com/api/candidate/jobs?scope=submitted",
    dashboard_api_2: "https://api-beta.skilent.com/api/candidate-invites/accepted-invites?range=year",
    dashboard_api_3: "https://api-beta.skilent.com/api/candidate-invites/my-invites",
    dashboard_api_4: "https://api-beta.skilent.com/api/profile",
    dashboard_api_5: "https://api-beta.skilent.com/api/notifications/unread",

    notification: "https://api-beta.skilent.com/api/notifications?page=1&perPage=50",

    // Profile API's
    profile_emp: "https://api-beta.skilent.com/api/candidate/employee-info",
    profile_edu: "https://api-beta.skilent.com/api/profile/educations",
    profile_exp: "https://api-beta.skilent.com/api/candidate/work-experiences",
    profile_res: "https://api-beta.skilent.com/api/candidate/resume"

}

export default api;