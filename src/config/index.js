const { string } = require("@hapi/joi");
const convict = require("convict");
convict.addFormat(require("convict-format-with-validator").ipaddress);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1", 
    env: "IP_ADDRESS",
  },
  server: {
    maxLoginAttenpts: {
      doc: "To limit invalid login attempt by user",
      format: Number,
      default: 5,
    },
    baseUrl: {
      doc: "Base url to bind",
      format: String,
      default: "",
      env: "BASE_URL",
    },
    http: {
      port: {
        doc: "HTTP port to bind",
        format: "port",
        default: 3000,
        env: "PORT",
      },
    },
    https: {
      enableHttpsServer: {
        doc: "Enable https server",
        format: Boolean,
        default: false,
      },
      port: {
        doc: "HTTPS port to bind",
        format: "port",
        default: 3000,
        env: "HTTPSPORT",
      },
      privateKey: {
        doc: "Private key file name",
        format: String,
        default: "key.pem",
      },
      certificate: {
        doc: "Certificate file name",
        format: String,
        default: "ssl.crt",
      },
      ca_g1: {
        doc: "Certificate file name",
        format: String,
        default: "g1.crt",
      },
      ca_g2: {
        doc: "Certificate file name",
        format: String,
        default: "g2.crt",
      },
    },
    enableCompression: {
      doc: "Enable HTTP compression",
      format: Boolean,
      default: true,
    },
    enableSessionSQL: {
      doc: "Enable HTTP compression",
      format: Boolean,
      default: false,
    },
    enableStatic: {
      doc: "Enable Express static server",
      format: Boolean,
      default: true,
    },
    enableAuthentication: {
      doc: "Enable Express api authentication",
      format: Boolean,
      default: true,
    },
    enableRequestLogs: {
      doc: "Enable Request Logs",
      format: Boolean,
      default: true,
    },
    static: {
      directory: {
        doc: "Express static server content directory",
        format: String,
        default: "../public/",
      },
      options: {
        doc: "Express static server options",
        format: Object,
        default: { maxAge: 0 },
      },
    },
    security: {
      enableApiKey: {
        doc: "Enable api key authentication",
        format: Boolean,
        default: false,
      },
      enableCORS: {
        doc: "Enable CORS",
        format: Boolean,
        default: true,
      },
      clientApiKey: {
        doc: "Client api ket to access node rest api",
        format: String,
        default: "de8f162b-b9d4-4015-9363-i83y6ea7cce7",
      },
      emailSalt: {
        doc: "salt",
        format: String,
        default: "$2a$10$e.oPc.dyrwRoQCpDvO9Rhe",
      },
    },
    CORS: {
      allowedHosts: {
        doc: "Allowed Host for CORS",
        format: Array,
        default: ["https://glueple.com",
          "https://glueple.com",
          "https://retailanalytics.qdegrees.com",
          "http://retailanalytics.qdegrees.com",
          "http://samparq.qdegrees.com",
          "https://samparq.qdegrees.com",
          "https://e596-183-83-177-61.ap.ngrok.io",
          "http://960c-2401-4900-1c1a-24cd-450d-ba5a-f316-b59e.in.ngrok.io","https://98e9-182-71-112-194.in.ngrok.io"]
      },
      allowedMethods: {
        doc: "Allowed HTTP Methods for CORS",
        format: String,
        default: "GET,POST,PUT,PATCH,OPTIONS",
      },
      allowedHeaders: {
        doc: "Allowed HTTP Headers for CORS",
        format: String,
        default: "accept, x-auth-token, content-type, certificate,",
      },
      exposedHeaders: {
        doc: "Exposed HTTP Headers for CORS",
        format: String,
        default: "XSRF-TOKEN",
      },
    },
    session: {
      sidname: {
        doc: "Name of a session",
        format: String,
        default: "connect.sid",
      },
      path: {
        doc: "Path of a session",
        format: String,
        default: "/",
      },
      httpOnly: {
        doc: "httpOnly cookie",
        format: Boolean,
        default: true,
      },
      secure: {
        // should be set to true when using https
        doc: "Http security of a session",
        format: Boolean,
        default: false,
      },
      maxAge: {
        doc: "Maximum age of a session",
        format: Number,
        default: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
      proxy: {
        // should set to true when using https and reverse proxy
        // like HAproxy
        doc: "Http proxy",
        format: Boolean,
        default: false,
      },
      rolling: {
        // should set to true when want to have sliding window
        // session
        doc: "For sliding window of a session",
        format: Boolean,
        default: true,
      },
      cookieSecret: {
        doc: "For sliding window of a session",
        format: String,
        default: "",
      },
    },
    JWT: {
      jwtPrivateKey: {
        doc: "jwt private key",
        format: String,
        default: "npci-secret-key",
      },
      jwtexpiresIn: {
        doc: "jwt expiration time",
        format: String,
        default: "12h",
      },
    },
    bodyParser: {
      limit: {
        doc: "maximum request body size",
        format: String,
        default: "500mb",
      },
    },
  },
  mailgun: {
    apiKey: {
      doc: "Api Key",
      format: String,
      default: "",
    },
    domain: {
      doc: "Domain",
      format: String,
      default: "",
    },
    fromUser: {
      doc: "Application user for sending mails",
      format: String,
      default: "",
    },
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "localhost",
    },
    database: {
      doc: "Database name",
      format: String,
      default: "",
    },
    username: {
      doc: "Database username",
      format: String,
      default: "root",
    },
    password: {
      doc: "Database password",
      format: String,
      default: "",
    },
    dialect: {
      doc: "Database Type",
      format: ["mysql", "mariadb", "postgres", "mssql"],
      default: "mysql",
    },
    enableSeed: {
      doc: "Database Type",
      format: Boolean,
      default: false,
    },
    enableLogging: {
      doc: "Database Logging",
      format: Boolean,
      default: true,
    },
  },
  redis: {
    enableRedis: {
      doc: "To use redis in application",
      format: Boolean,
      default: false,
    },
    host: {
      doc: "Redis host name/IP",
      format: String,
      default: "127.0.0.1",
    },
    database: {
      doc: "Database name",
      format: String,
      default: "",
    },
    port: {
      doc: "Redis Port",
      format: Number,
      default: 6379,
    },
    password: {
      doc: "Redis Database password",
      format: String,
      default: "",
    },
  },
  reRun_Time: {
    updateStatusTime: {
      doc: "re-run delivery status function time",
      format: Number,
      default: 60000,
    },
  },
  multer: {
    uploadDirectoryPath: {
      doc: "Multer upload directory path",
      format: String,
      default: "../public/uploads/",

    },
    uploadJdPath: {
      doc: "Multer upload directory path",
      format: String,
      default: "../public/job_description",
    },
    uploadDocumentPath: {
      doc: "Multer upload  directory path",
      format: String,
      default: "public/employee_documents_files/",
    },
    testing: {
      doc: "Multer upload  directory path",
      format: String,
      default: "/public/testing",
    },
    uploadOfferLetterPath: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/offer_letters/",
    },
    uploadEmployeeExcelPath: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/employee_excel",
    },
    uploadAssetExcelPath: {
      doc: "Multer upload directory path",
      format: String,
      default: "server/public/asset_excel/",
    },
    uploadResumeForReferral: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/referred_resumes",
    },
    uploadEmployeeProfilePicture: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/employee_profile_picture/"
    },
    uploadCandidateResume: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/candidate_resume",
    },
    uploadSignInPolicy: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/sign_for_policy"
    },
    uploadAttendanceImage: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/emp_attendance_image"
    },
    uploadEmployeeleaveFile: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/employee_leave_documents"
    },
    uploadDocumentFromFinanceForTravel: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/employee_travel_document_from_finance"
    },
    uploadDocumentForClaim: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/travel/document_for_claim"
    },
    uploadCandidateImage: {
      doc: "Multer upload directory path",
      format: String,
      default: "/public/candidate_images"
    },
    uploadFaceDetectImage: {
      doc: "Multer Upload Image For Face Detection",
      format: String,
      default: "/public/image_for_face_detection"
    },
    uploadEmployeeAttendanceData: {
      doc: "Multer Upload Excel For Employee Attendance Report From Hikvision Device",
      format: String,
      default: "/public/employe_attendance_report_from_hikvision_device"
    },
    uploadProbationData: {
      doc: "Multer upload excel for probation data",
      format: String,
      default: "/public/probationData"
    },

    uploadResumeForParsing: {
      doc: "Multer upload PDF File for PDF Files Only ",
      format: String,
      default: "/public/candidate_resume_for_parsing"
    },
    
    uploadPolicies: {
      doc: "Multer upload PDF File",
      format: String,
      default: "/public/policies"
    },

    uploadUpdatedHODList:{
      doc: "Multer upload PDF File for PDF Files Only ",
      format: String,
      default: "/public/uploadUpdatedHODList"
    },
    uploadResumeforJobFair : {
      doc: "Multer upload PDF File for PDF Files Only ",
      format: String,
      default: "/public/job_fair_resume"
    },
    uploadResumeJobApplication: {
      doc: "Multer upload PDF File for PDF Files Only ",
      format: String,
      default: "/public/job_application_resume"
    },
    uploadexcel_PMS:{
      doc: "Multer upload for excel Files Only ",
      format: String,
      default: "/public/pms_sheet"
    },
    uploadPL_count:{
      doc: "Multer upload for excel Files Only ",
      format: String,
      default: "/public/ishika"
    },
    bulkUploadSalary:{
      doc: "Multer upload for salary updation",
      format: String,
      default: "/public/admin"
    },
    uploadUndertakingForm: {
      doc: "Multer upload for asset undertaking",
      format: String,
      default: "/public/asset_undertaking/"
    },
  },
  downloadPath: {
    pmsReportMyTeamSection: {
      doc: "Multer upload directory path",
      format: String,
      default: "./public/pms/kra_assigned_to_employee_report.xlsx",
    },
    KRARawDumpfilePath: {
      doc: "Multer upload directory path",
      format: String,
      default: "./public/pms/employee_rating_details.xlsx",
    },
  },
  serverPath: {
    resumePath: {
      doc: "resume path for candidate",
      format: String,
      default: "https://glueple.com:3001/candidate_resume"
    },
  },

  hrms_trave_file_download_path: {
    doc: "hrms static file path for download a file",
    format: String,
    default: "https://glueple.com:3001/employee_travel_document_from_finance"
  },
  hrms_folder_path_for_employee_profile_picture: {
    doc: "hrms employee profile picture folder path",
    format: String,
    default: "https://glueple.com:3001/employee_profile_picture/"
  },
  hrqpro_base_url: {
    doc: "hrms base url",
    format: String,
    default: "https://glueple.com:3001"
  },

  // mrf important terminologies
    // email for team it 
hrms_keywords:{
  hrms_mrf_keywords: {
    mrf_vacancy:{
      doc: "MRF Vacancy",
      format: Array,
      default:[
        {
        name:"vacancy",
        db_table_name:"mrf_vacancy",
        realted_to:"MRF Vacancy"
        }
    ]
    }, 
    mrf_replacement:{
      doc: "MRF Replacement",
      format: Array,
      default:[
        {
        name:"replacement",
        db_table_name:"mrf_replacement",
        realted_to:"MRF Replacement"
        }
      ]
    },
  }
},


    
 
  ccEmails: {
    email: {
      doc: "cc emails  for hrms",
      format: Array,
      default: [
        "sonam.rara@qdegrees.com",
        "sb@qdegrees.com",
        "pankaj.sharma@qdegrees.com",
      ],
    },
  },

  ccEmailsOfferLetter: {
    email: {
      doc: "cc emails  for hrms offer letter",
      format: Array,
      default: [
        "sonam.rara@qdegrees.com",
        "pankaj.sharma@qdegrees.com",
        "udita.saxena@qdegrees.com",
        "princy.sethiya@qdegrees.com"
      ],
    },
  },


  // email for team it 
ccEmailTicketManagementSystem: {
    email_for_it_dept: {
      doc: "CC Emails For Ticket Management System for IT Department",
      format: Array,
      default: [
        "sb@qdegrees.com",
       
        "it-support@qdegrees.com",
        "aniket.sachdeva@qdegrees.com",
        "aabhilash.nagar@qdegrees.com",
        "radhey.yadav@qdegrees.com",
        "trilok.bhargava@qdegrees.com",
        "satypal.ranawat@qdegrees.org"
      ],
    },

    // CC Email For HR Department
    email_for_hr_dept:{
      doc: "CC Emails For Ticket Management System for HR Department",
      format: Array,
      default: [
        "sb@qdegrees.com",

        "hr@qdegrees.com",
        "sonam.rara@qdegrees.com",
        "pankaj.sharma@qdegrees.com"
      ],
    },

     // CC Email For Finance  Department
     email_for_finance_dept: {
      doc: "CC Emails For Ticket Management System for Finance Department",
      format: Array,
      default: [
        "sb@qdegrees.com",
        "hr@qdegrees.com",
        "finance@qdegrees.com",
        "saurabh@qdegrees.com",
        "upasna.sharma@qdegrees.com"
      ],
    },


      // CC Email For Admin  Department
      email_for_admin_dept: {
        doc: "CC Emails For Ticket Management System for Admin Department",
        format: Array,
        default: [
          "sb@qdegrees.com",
  
          "hr@qdegrees.com",
          "finance@qdegrees.com",
          "saurabh@qdegrees.com",
          "admin@qdegrees.com",
          "rahul.savlani@qdegrees.com",
        ],
      },
  },
  
  encryptCTC: {
    doc: "encrytion key",
    format: String,
    default: "hrms_secret_key_for_ctcencr",
  }
});

// Load environment dependent configuration
let env = config.get("env");

config.loadFile(`${__dirname}/${env}.json`);

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
