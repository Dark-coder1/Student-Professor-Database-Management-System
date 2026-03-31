/**
 * api.js — Data layer.
 * Tries the Express backend first (/api/*).
 * If the server is not running (404/NetworkError), falls back to
 * LOCAL_DATA so the app works by opening index.html directly in a browser.
 */

const API_BASE = "/api";

// ── Local fallback data ───────────────────────────────────────
const LOCAL_FACULTY = [
  {
    "id": 1,
    "emoji": "👩‍💻",
    "name": "Dr. Srinivas S",
    "title": "Dean, SAS, Professor HAG",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5331",
    "email": "srinivas.s@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G23-A, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Srinivas_S_70004_0497_2c281fd932.avif"
  },
  {
    "id": 2,
    "emoji": "👨‍🔬",
    "name": "Dr. Dilipkumar Mohanty",
    "title": "Dean, SMEC, Professor Grade 1",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 5147",
    "email": "mohanty.dk@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "310-H, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Dilipkumar_Mohanty_70016_IMG_2317_SMEC_0951702ac8.avif"
  },
  {
    "id": 3,
    "emoji": "👩‍🏫",
    "name": "Dr. Y. V. Pavan Kumar",
    "title": "Dean SENSE, Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5364",
    "email": "pavankumar.yv@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "422-G, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70049_Dr_Y_V_Pavan_Kumar_SENSE_1184_2954015774.avif"
  },
  {
    "id": 4,
    "emoji": "👨‍🏫",
    "name": "Dr. Sudhakar Ilango",
    "title": "Dean, SCOPE, Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5459",
    "email": "sudhakar.ilango@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 320-C",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sudhakar_Ilango_70087_IMG_4727_SCOPE_68f8caba72.avif"
  },
  {
    "id": 5,
    "emoji": "👩‍🔬",
    "name": "Dr. Benarji Chakka",
    "title": "Dean, VSL, Professor HAG",
    "dept": "VSL",
    "deptLabel": "School of Law (VSL)",
    "phone": "+91 9633440800",
    "email": "benarji.chakka@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "416-A, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70169_Dr_Benarji_Chakka_VSL_1383_213e2b1f4a.avif"
  },
  {
    "id": 6,
    "emoji": "👨‍💼",
    "name": "Dr. Priyanka Ghosh",
    "title": "Dean In-Charge, VISH, Associate Professor Grade 1",
    "dept": "VISH",
    "deptLabel": "School of Social Science and Humanities (VISH)",
    "phone": "+91 5133",
    "email": "dean.vish@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": " 224-A, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Priyanka_Ghosh_VISH_1463_b08f244c8b.avif"
  },
  {
    "id": 7,
    "emoji": "👩‍💼",
    "name": "Dr. M Venkata Rajanikanth",
    "title": "Dean Academic Research, Professor Grade 1",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5906",
    "email": "rajanikanth.machavaram@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G05-F, Central Block",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Venkata_Rajanikanth_IMG_6740_SASPHY_988d5487c2.avif"
  },
  {
    "id": 8,
    "emoji": "🧑‍🏫",
    "name": "Dr.Arunkumar Sivakumar",
    "title": "Dean –In Charge, VSB, Associate Professor Senior",
    "dept": "VSB",
    "deptLabel": "School of Business (VSB)",
    "phone": "+91 5847",
    "email": "arunkumar.sivakumar@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "410G, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Arunkumar_Sivakumar_VSB_ca331d8994.avif"
  },
  {
    "id": 9,
    "emoji": "🧑‍💻",
    "name": "Dr. Jagadish Chandra Mudiganti",
    "title": "Registrar, Professor HAG",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5157",
    "email": "mudiganti.jc@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "N/A",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/4_Dr_Jagadish_Chandra_Mudiganti_SENSE_70014_03cc80fda8.avif"
  },
  {
    "id": 10,
    "emoji": "👩‍💻",
    "name": "Dr. P Arulmozhivarman",
    "title": "Vice Chancellor (I/c)",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 9778354569",
    "email": "vc@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB G08",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_P_Arulmozhivarman_VC_3e6b8e2db2.avif"
  },
  {
    "id": 11,
    "emoji": "👨‍🔬",
    "name": "Dr. Saroj Kumar Panigrahy",
    "title": "Associate-Dean, SCOPE, Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5360",
    "email": "saroj.panigrahy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 320-B",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Saroj_Kumar_Panigrahy_70051_IMG_4724_SCOPE_877760db9f.avif"
  },
  {
    "id": 12,
    "emoji": "👩‍🏫",
    "name": "Dr. Usha Seshadri",
    "title": "Associate Dean, VSB, Associate Professor Grade 2",
    "dept": "VSB",
    "deptLabel": "School of Business (VSB)",
    "phone": "+91 5410",
    "email": "usha.seshadri@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "410, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70114_Dr_Usha_Seshadri_VSB_1192_e750b5fc3c.avif"
  },
  {
    "id": 13,
    "emoji": "👨‍🏫",
    "name": "Dr. Ananthu S Hari",
    "title": "Assistant Dean  VSL, Assistant Professor Senior Grade 2",
    "dept": "VSL",
    "deptLabel": "School of Law (VSL)",
    "phone": "+91 5919",
    "email": "ananthu.s.hari@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "416-D, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70541_Dr_Ananthu_S_Hari_VSL_1109_ac7d036a78.avif"
  },
  {
    "id": 14,
    "emoji": "👩‍🔬",
    "name": "Dr. Vemula Ramakrishna Reddy",
    "title": "Head, Dept. of Mathematics, Associate Professor Grade 1",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9889900985",
    "email": "ramakrishna.reddy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G23-I, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Vemula_Ramakrishna_Reddy_SAS_MAT_1925_069bd98a76.avif"
  },
  {
    "id": 15,
    "emoji": "👨‍💼",
    "name": "Dr. Nagaraju Devarakonda",
    "title": "Head, Dept. of Software and System Engineering, Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5352",
    "email": "nagaraju.devarakonda@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G05-G",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Nagaraju_Devarakonda_70104_IMG_4890_SCOPE_6ce8e6103a.avif"
  },
  {
    "id": 16,
    "emoji": "👩‍💼",
    "name": "Dr. Gurumurthy Komanapalli",
    "title": "Head, Dept. of Micro and Nano Electronics, Associate Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5707",
    "email": "gurumurthy.k@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "329-E, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Gurumurthy_Komanapalli_70180_IMG_5134_SENSE_61560a4248.avif"
  },
  {
    "id": 17,
    "emoji": "🧑‍🏫",
    "name": "Dr. Subhasish Mahapatra",
    "title": "Head, Dept. of Embedded Systems, Associate Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5711",
    "email": "subhasish.m@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "326-D, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Subhasish_Mahapatra_70183_IMG_2589_SENSE_ffbbcc5c69.avif"
  },
  {
    "id": 18,
    "emoji": "🧑‍💻",
    "name": "Dr. Khairnar Vikas Vishnu",
    "title": "Head, Dept. of Communications and Signal Processing, Associate Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5303",
    "email": "vikas.vishnu@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "329-H, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Khairnar_Vikas_Vishnu_IMG_6625_SENSE_ec891457ef.avif"
  },
  {
    "id": 19,
    "emoji": "👩‍💻",
    "name": "Dr. Reeja S R",
    "title": "Head, Dept. of Artificial Intelligence and Machine Learning. Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5967",
    "email": "reeja.sr@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G04-D",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Reeja_S_R_70306_0211_c3768ccf86.avif"
  },
  {
    "id": 20,
    "emoji": "👨‍🔬",
    "name": "Dr. G.Muneeswari",
    "title": "Head, Dept. of Data Science and Engineering, Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9024593488",
    "email": "muneeswari.g@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 205-E",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_G_Muneeswari_SCOPE_1458_c89f0d19e0.avif"
  },
  {
    "id": 21,
    "emoji": "👩‍🏫",
    "name": "Dr. Nagarjuna Neella",
    "title": "Head, Dept. of Physics, Assistant Professor Senior Grade 1",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5730",
    "email": "nagarjuna.neela@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "225-C, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Nagarjuna_Neella_70359_0499_a199913312.avif"
  },
  {
    "id": 22,
    "emoji": "👨‍🏫",
    "name": "Dr. Illa Ramakanth",
    "title": "Head, Dept. of Chemistry, Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5859",
    "email": "ramakanth.illa@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "204-A, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Illa_Ramakanth_SAS_0813_9c031a5f24.avif"
  },
  {
    "id": 23,
    "emoji": "👩‍🔬",
    "name": "Dr.Anil Vitthalrao Turukmane",
    "title": "Head, Dept. of Networking and Security, Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9325583185",
    "email": "anil.turukmane@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 229-E",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Anil_Vitthalrao_Turukmane_70487_0162_9c8d31f279.avif"
  },
  {
    "id": 24,
    "emoji": "👨‍💼",
    "name": "Dr. Ch. Naresh",
    "title": "Head, Dept. of Electrical Engineering, Assistant Professor Senior Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 9233226231",
    "email": "naresh.ch@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "424-F, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70492_Dr_Ch_Naresh_SENSE_1136_3cff4fb0a0.avif"
  },
  {
    "id": 25,
    "emoji": "👩‍💼",
    "name": "Dr. V R K Murty",
    "title": "Emeritus professor",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9232912936",
    "email": "vrkm@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "130, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70048_Dr_V_R_K_Murty_IMG_0994_SAS_689c0ba4f2.avif"
  },
  {
    "id": 26,
    "emoji": "🧑‍🏫",
    "name": "Dr. Mary Chandini Stephens",
    "title": "Emeritus Professor",
    "dept": "VISH",
    "deptLabel": "School of Social Science and Humanities (VISH)",
    "phone": "+91 9222373035",
    "email": "marychandini.y@vit.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "202-F , AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Mary_Chandini_Stephens_VISH_1566_517a2cb19d.avif"
  },
  {
    "id": 27,
    "emoji": "🧑‍💻",
    "name": "Dr. Hari Seetha",
    "title": "Professor HAG",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5131",
    "email": "seetha.hari@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB 222",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Hari_Seetha_SCOPE_0741_2b647e6904.avif"
  },
  {
    "id": 28,
    "emoji": "👩‍💻",
    "name": "Dr. N Madhusudhana Rao",
    "title": "Dean, Academics, Professor HAG",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5157",
    "email": "madhusudhana.n@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": " G-36, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70005_Dr_N_Madhusudhana_Rao_PHY_1360_73381f87c1.avif"
  },
  {
    "id": 29,
    "emoji": "👨‍🔬",
    "name": "Dr. Pankaj Balkrishna Tambe",
    "title": "Professor HAG",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 9954570885",
    "email": "pankaj.tambe@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "145, Faculty Area - 140 AB1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Pankaj_Balkrishna_Tambe_70009_IMG_2621_SMEC_2f648dd89a.avif"
  },
  {
    "id": 30,
    "emoji": "👩‍🏫",
    "name": "Dr. P S Rama Sreekanth",
    "title": "Professor HAG",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 5148",
    "email": "sreekanth.p@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "403, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_P_S_Rama_Sreekanth_70020_IMG_4723_SMEC_8e23baaadb.avif"
  },
  {
    "id": 31,
    "emoji": "👨‍🏫",
    "name": "Dr. Ravindra Dhuli",
    "title": "Professor HAG",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5363",
    "email": "ravindra.d@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "144, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ravindra_Dhuli_70053_IMG_4932_SENSE_00908717ad.avif"
  },
  {
    "id": 32,
    "emoji": "👩‍🔬",
    "name": "Dr. K Senthil",
    "title": "Professor HAG",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5818",
    "email": "senthil.k@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "115-B, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70400_Dr_K_Senthil_1055_110b0a68fe.avif"
  },
  {
    "id": 33,
    "emoji": "👨‍💼",
    "name": "Dr. Edara Sreenivasa Reddy",
    "title": "Professor HAG",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9021423791",
    "email": "sreenivasareddy.e@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G07-H",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Edara_Sreenivasa_Reddy_SCOPE_IMG_2139_cb903a1d75.avif"
  },
  {
    "id": 34,
    "emoji": "👩‍💼",
    "name": "Dr. Prabha Selvaraj",
    "title": "Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9208679886",
    "email": "prabha.s@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 415-H",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Prabha_Selvaraj_SCOPE_IMG_7108_b396b325ac.avif"
  },
  {
    "id": 35,
    "emoji": "🧑‍🏫",
    "name": "Dr. Raghavendra",
    "title": "Professor Grade 2 ",
    "dept": "VSB",
    "deptLabel": "School of Business (VSB)",
    "phone": "+91 5412",
    "email": "raghavendra@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "410A, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70292_Dr_Raghavendra_VSB_1186_f1a8884d65.avif"
  },
  {
    "id": 36,
    "emoji": "🧑‍💻",
    "name": "Dr. Dasari Venkata Lakshmi",
    "title": "Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9792994973",
    "email": "venkatalakshmi.d@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G07-G",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Dasari_Venkata_Lakshmi_SCOPE_0724_67dcd708c3.avif"
  },
  {
    "id": 37,
    "emoji": "👩‍💻",
    "name": "Dr. Eswaraiah Rayachoti",
    "title": "Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9160480361",
    "email": "eswaraiah.rayachoti@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 201-H",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Eswaraiah_Rayachoti_70391_IMG_4691_SCOPE_d854f7b1d3.avif"
  },
  {
    "id": 38,
    "emoji": "👨‍🔬",
    "name": "Dr. Y Narasimha Rao",
    "title": "Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9092935080",
    "email": "y.narasimharao@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 415-A",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Y_Narasimha_Rao_70465_IMG_4699_SCOPE_137431ee92.avif"
  },
  {
    "id": 39,
    "emoji": "👩‍🏫",
    "name": "Dr. Ameet Chavan",
    "title": "Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5612",
    "email": "ameetchavan@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "326-A, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ameet_Chavan_IMG_6613_SENSE_eb65164181.avif"
  },
  {
    "id": 40,
    "emoji": "👨‍🏫",
    "name": "Dr. Sumesh E. P",
    "title": "Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 9034797574",
    "email": "sumesh.ep@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "152, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70510_Dr_Sumesh_E_P_SENSE_1148_b90cc8bdd9.avif"
  },
  {
    "id": 41,
    "emoji": "👩‍🔬",
    "name": "Dr. Vasavi Sanikommu",
    "title": "Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9596867267",
    "email": "vasavi.sanikommu@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB, 104-A",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Vasavi_Sanikommu_SCOPE_e2951d2160.avif"
  },
  {
    "id": 42,
    "emoji": "👨‍💼",
    "name": "Dr. Nalluri Purnachand",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5160",
    "email": "purnachand.n@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "128, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Nalluri_Purnachand_70027_IMG_5128_SENSE_1c9b26e785.avif"
  },
  {
    "id": 43,
    "emoji": "👩‍💼",
    "name": "Dr. Umakanta Nanda",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5362",
    "email": "umakanta.n@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "326-E, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Umakanta_Nanda_SENSE_1828_1_804cdb609d.avif"
  },
  {
    "id": 44,
    "emoji": "🧑‍🏫",
    "name": "Dr. Deepak Ch",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5367",
    "email": "deepak.ch@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "329-I, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Deepak_Ch_70059_IMG_2637_SENSE_18c600cdbe.avif"
  },
  {
    "id": 45,
    "emoji": "🧑‍💻",
    "name": "Dr. Anoop Kumar Mishra",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5349",
    "email": "anoop.m@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "328-A, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Anoop_Kumar_Mishra_70060_IMG_2645_SENSE_75a3f451e8.avif"
  },
  {
    "id": 46,
    "emoji": "👩‍💻",
    "name": "Dr. Sameeulla Khan Md",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5368",
    "email": "sameeulla.k@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G36-D, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sameeulla_Khan_Md_70061_IMG_2610_SENSE_9451c395f5.avif"
  },
  {
    "id": 47,
    "emoji": "👨‍🔬",
    "name": "Dr. Ambuj Sharma",
    "title": "Professor Grade 1",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 9315647572",
    "email": "sharma.ambuj@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "328-I , AB1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ambuj_Sharma_IMG_2320_70069_SMEC_9078d3cd6b.avif"
  },
  {
    "id": 48,
    "emoji": "👩‍🏫",
    "name": "Dr. Jayendra Kumar",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5347",
    "email": "kumar.jayendra@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "422-F, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Jayendra_Kumar_70077_IMG_4911_SENSE_3409ac7d14.avif"
  },
  {
    "id": 49,
    "emoji": "👨‍🏫",
    "name": "Dr. Sudha Ellison Mathe",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5348",
    "email": "ellison.mathe@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "206, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sudha_Ellison_Mathe_70078_IMG_5140_SENSE_e65e618ff3.avif"
  },
  {
    "id": 50,
    "emoji": "👩‍🔬",
    "name": "Dr. R. Nandha Kumar",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5451",
    "email": "nandha.r@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; (CTS-421)",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_R_Nandha_Kumar_IMG_6597_SCOPE_36b1aaa52e.avif"
  },
  {
    "id": 51,
    "emoji": "👨‍💼",
    "name": "Dr. Nuthakki Venkata Rajasekhar",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5453",
    "email": "rajasekhar.venkata@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "229-B, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Nuthakki_Venkata_Rajasekhar_70081_IMG_4945_SENSE_eadfe15605.avif"
  },
  {
    "id": 52,
    "emoji": "👩‍💼",
    "name": "Dr. Manoj Kumar Gupta",
    "title": "Professor Grade 1",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 5454",
    "email": "manoj.gupta@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "AB1 424D",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Manoj_Kumar_Gupta_SMEC_1476_2a327f8859.avif"
  },
  {
    "id": 53,
    "emoji": "🧑‍🏫",
    "name": "Dr. Sibi Chakkaravarthy S",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5456",
    "email": "chakkaravarthy.sibi@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 222",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sibi_Chakkaravarthy_S_70084_0587_206cccb3ec.avif"
  },
  {
    "id": 54,
    "emoji": "🧑‍💻",
    "name": "Dr. Sunny Dayal Vanambathina",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5462",
    "email": "sunny.dayal@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "214, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sunny_Dayal_Vanambathina_70090_IMG_4949_SENSE_1fe3b7b635.avif"
  },
  {
    "id": 55,
    "emoji": "👩‍💻",
    "name": "Dr. Manikanta Ravindra Kumar Vakkalagadda",
    "title": "Professor Grade 1",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 5145",
    "email": "ravindra.v@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "144, Faculty Area - 140 AB1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Manikanta_Ravindra_Kumar_Vakkalagadda_70092_IMG_4889_SMEC_279f4bf081.avif"
  },
  {
    "id": 56,
    "emoji": "👨‍🔬",
    "name": "Dr. Aravapalli Rama Satish",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5353",
    "email": "rama.satish@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 408-H",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Aravapalli_Rama_Satish_IMG_1837_SCOPE_8db829393d.avif"
  },
  {
    "id": 57,
    "emoji": "👩‍🏫",
    "name": "Dr. Paramasivam R",
    "title": "Professor Grade 1",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5694",
    "email": "paramasivam.r@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "125-E, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Paramasivam_R_70106_IMG_2564_SAS_CHY_828bbdfac1.avif"
  },
  {
    "id": 58,
    "emoji": "👨‍🏫",
    "name": "Dr. Harikiran Jonnadula",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5166",
    "email": "harikiran.j@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 103-F",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Harikiran_Jonnadula_70110_IMG_4751_SCOPE_adcc11a534.avif"
  },
  {
    "id": 59,
    "emoji": "👩‍🔬",
    "name": "Dr. Selvakumar Karuthapandi",
    "title": "Professor Grade 1",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5696",
    "email": "selvakumar.k@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "125-G, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Selvakumar_Karuthapandi_70119_IMG_2567_SAS_CHY_024bf2f855.avif"
  },
  {
    "id": 60,
    "emoji": "👨‍💼",
    "name": "Dr. Ganesh Reddy Karri",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9479737365",
    "email": "ganesh.reddy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 221",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ganesh_Reddy_Karri_70140_IMG_4952_SCOPE_3e82aa165c.avif"
  },
  {
    "id": 61,
    "emoji": "👩‍💼",
    "name": "Dr. P. Kuppusamy",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9931537600",
    "email": "kuppusamy.p@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB;103-A",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_P_Kuppusamy_70282_0158_80b87944be.avif"
  },
  {
    "id": 62,
    "emoji": "🧑‍🏫",
    "name": "Dr. Naga Jagadesh Bommagani",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5855",
    "email": "nagajagadesh.bommagani@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 201-F",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Naga_Jagadesh_Bommagani_SCOPE_1881_f7e99e75d7.avif"
  },
  {
    "id": 63,
    "emoji": "🧑‍💻",
    "name": "Dr Sachi Nandan Mohanty",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9640730284",
    "email": "sachinandan.m@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 205-G",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sachi_Nandan_Mohanty_SCOPE_1551_ec578c759f.avif"
  },
  {
    "id": 64,
    "emoji": "👩‍💻",
    "name": "Dr. Bharathi V C",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9941454021",
    "email": "bharathi.vc@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 415-B",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70466_Dr_Bharathi_V_C_SCOPE_1227_884cfa7b99.avif"
  },
  {
    "id": 65,
    "emoji": "👨‍🔬",
    "name": "Dr. Hemant Kumar Reddy",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9006610671",
    "email": "hemanth.reddy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 427-B",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Hemant_Kumar_Reddy_70493_IMG_4765_SCOPE_5a07de8e26.avif"
  },
  {
    "id": 66,
    "emoji": "👩‍🏫",
    "name": "Dr. Srinivasa Reddy Konda",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9392188022",
    "email": "srinivasareddy.k@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 312 (CDC)",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70517_Dr_Srinivasa_Reddy_Konda_SCOPE_1251_c51ac3591e.avif"
  },
  {
    "id": 67,
    "emoji": "👨‍🏫",
    "name": "Dr.Anupriya Elumalai",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9706618048",
    "email": "anupriya.e@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: 312 (CDC)",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Anupriya_Elumalai_IMG_6631_SCOPE_c743348009.avif"
  },
  {
    "id": 68,
    "emoji": "👩‍🔬",
    "name": "Dr. Kalapraveen Bagadi",
    "title": "Professor Grade 1",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 9839249137",
    "email": "kalapraveen.b@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "126, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Kalapraveen_Bagadi_SENSE_1923_3c237f7b88.avif"
  },
  {
    "id": 69,
    "emoji": "👨‍💼",
    "name": "Dr. Suresh Dara",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9048202327",
    "email": "suresh.d@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 418-L",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70628_Dr_Suresh_Dara_SCOPE_1255_0087af24fc.avif"
  },
  {
    "id": 70,
    "emoji": "👩‍💼",
    "name": "Dr. Tarun Narayan Shankar",
    "title": "Professor Grade 1",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9075037573",
    "email": "tarun.shankar@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB, 432-F",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Tarun_Narayan_Shankar_SCOPE_dff8244c0d.avif"
  },
  {
    "id": 71,
    "emoji": "🧑‍🏫",
    "name": "Dr. John Pradeep D",
    "title": "Associate Professor Senior",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5444",
    "email": "john.darsy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G30, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_John_Pradeep_D_70007_IMG_4713_SENSE_9d6a075b3b.avif"
  },
  {
    "id": 72,
    "emoji": "🧑‍💻",
    "name": "Dr. Khadheer Pasha Sk",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5125",
    "email": "khadheerpasha.sk@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "125, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Khadheer_Pasha_Sk_IMG_9445_A_SASPHY_21a18e2791.avif"
  },
  {
    "id": 73,
    "emoji": "👩‍💻",
    "name": "Dr. E. Ajith Jubilson",
    "title": "Associate Professor Senior",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9547772356",
    "email": "ajith.jubilson@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 407-A",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_E_Ajith_Jubilson_SCOPE_1956_20273c1217.avif"
  },
  {
    "id": 74,
    "emoji": "👨‍🔬",
    "name": "Dr Santanu Mandal",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5566",
    "email": "santanu.mandal@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "320-B, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Santanu_Mandal_70030_IMG_4872_SAS_MAT_2f47fe5831.avif"
  },
  {
    "id": 75,
    "emoji": "👩‍🏫",
    "name": "Dr. Roopas Kiran Sirugudu",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9139561741",
    "email": "roopaskiran.s@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G-36, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70031_Dr_Roopas_Kiran_Sirugudu_Physics_1101_51b282850f.avif"
  },
  {
    "id": 76,
    "emoji": "👨‍🏫",
    "name": "Dr. Hussain Syed",
    "title": "Associate Professor Senior",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9265324345",
    "email": "hussain.syed@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 227-D",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Hussain_Syed_70032_IMG_4953_SCOPE_d31f2b1b37.avif"
  },
  {
    "id": 77,
    "emoji": "👩‍🔬",
    "name": "Dr. J Sudagar",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5153",
    "email": "sudagar.jothi@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "153, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Sudagar_IMG_6746_SASPHY_4a01516fb6.avif"
  },
  {
    "id": 78,
    "emoji": "👨‍💼",
    "name": "Dr. Deepasikha Mishra",
    "title": "Associate Professor Senior",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5170",
    "email": "deepasikha.mishra@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "AB-1; 326-G",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Deepasikha_Mishra_SCOPE_IMG_2165_1a6c21eb30.avif"
  },
  {
    "id": 79,
    "emoji": "👩‍💼",
    "name": "Dr. Debajit Goswami",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9783672292",
    "email": "debajit.g@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "125-M, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Debajit_Goswami_SASPHY_2bb166cd6f.avif"
  },
  {
    "id": 80,
    "emoji": "🧑‍🏫",
    "name": "Dr. Hari Kishan Kondaveeti",
    "title": "Associate Professor Senior",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5341",
    "email": "kishan.kondaveeti@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G05-B",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Hari_Kishan_Kondaveeti_70071_0222_ce0e2c7f25.avif"
  },
  {
    "id": 81,
    "emoji": "🧑‍💻",
    "name": "Dr. Suyog Jhavar",
    "title": "Associate Professor Senior",
    "dept": "SMEC",
    "deptLabel": "School of Mechanical Engineering (SMEC)",
    "phone": "+91 9483203046",
    "email": "suyog.jhavar@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "313-B, AB1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Suyog_Jhavar_SMEC_1890_ffeed0473e.avif"
  },
  {
    "id": 82,
    "emoji": "👩‍💻",
    "name": "Dr.Shaiku Shahida Saheb",
    "title": "Associate Professor Senior",
    "dept": "VSB",
    "deptLabel": "School of Business (VSB)",
    "phone": "+91 9654974589",
    "email": "shahid.sk@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "422-E, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Shaiku_Shahida_Saheb_74dba30f8b.avif"
  },
  {
    "id": 83,
    "emoji": "👨‍🔬",
    "name": "Dr. Ravi Kumar Bandaru",
    "title": "Associate Professor Senior",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9681949549",
    "email": "ravikumar.bandaru@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "124-C, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ravi_Kumar_Bandaru_70604_IMG_2623_SAS_MAT_112b3d5a7e.avif"
  },
  {
    "id": 84,
    "emoji": "👩‍🏫",
    "name": "Dr. Sudhakar M",
    "title": "Associate Professor Grade 2",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 9643894157",
    "email": "sudhakar.matle@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G23-B, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Sudhakar_M_SAS_MAT_1843_bf3afd5621.avif"
  },
  {
    "id": 85,
    "emoji": "👨‍🏫",
    "name": "Dr. Phani Kumar M",
    "title": "Associate Professor Grade 2",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5568",
    "email": "phani.m@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "G23-C, AB-2",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Phani_Kumar_M_SAS_MAT_1933_df8cb65bb4.avif"
  },
  {
    "id": 86,
    "emoji": "👩‍🔬",
    "name": "Dr. Soubhagya Sankar Barpanda",
    "title": "Associate Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5171",
    "email": "soubhagya.barpanda@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; 427-C",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Soubhagya_Sankar_Barpanda_70023_IMG_4864_SCOPE_b5ae90d239.avif"
  },
  {
    "id": 87,
    "emoji": "👨‍💼",
    "name": "Dr. Arun Kumar Sinha",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5351",
    "email": "arunkumar.s@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "328-D, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Arun_Kumar_Sinha_SENSE_867c65c402.avif"
  },
  {
    "id": 88,
    "emoji": "👩‍💼",
    "name": "Dr. Samineni Peddakrishna",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5464",
    "email": "samineni.peddakrishna@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "422-D, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Samineni_Peddakrishna_SENSE_0863_2ee5d71685.avif"
  },
  {
    "id": 89,
    "emoji": "🧑‍🏫",
    "name": "Dr. S. Gopikrishnan",
    "title": "Associate Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 5356",
    "email": "gopikrishnan.s@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G05-C",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_S_Gopikrishnan_70107_0214_0692d6708b.avif"
  },
  {
    "id": 90,
    "emoji": "🧑‍💻",
    "name": "Dr. Rohit Lorenzo",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5158",
    "email": "rohit.lorenzo@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "158, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Rohit_Lorenzo_SENSE_0754_5d7bfbd14c.avif"
  },
  {
    "id": 91,
    "emoji": "👩‍💻",
    "name": "Dr. Bappadittya Roy",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5328",
    "email": "bappadittya.roy@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "313-C, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Bappadittya_Roy_SENSE_1454_d58699f748.avif"
  },
  {
    "id": 92,
    "emoji": "👨‍🔬",
    "name": "Dr. Lakhan Dev Sharma",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5154",
    "email": "lakhan.sharma@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "154, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Lakhan_Dev_Sharma_70178_IMG_2656_SENSE_1919fa1977.avif"
  },
  {
    "id": 93,
    "emoji": "👩‍🏫",
    "name": "Dr. Rajeev Sharma",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5706",
    "email": "rajeev.sharma@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "310-E, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Rajeev_Sharma_70179_IMG_4915_SENSE_55132c6c58.avif"
  },
  {
    "id": 94,
    "emoji": "👨‍🏫",
    "name": "Dr. Prashanth Maroju",
    "title": "Associate Professor Grade 2",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5106",
    "email": "prashanth.m@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "AB-1, 152",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Prashanth_Maroju_70197_IMG_4979_SAS_MAT_8a4539f00d.avif"
  },
  {
    "id": 95,
    "emoji": "👩‍🔬",
    "name": "Dr. Arindam Dey",
    "title": "Associate Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9433399843",
    "email": "arindam.dey@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB; G07-F",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Arindam_Dey_SCOPE_1888_bae846c255.avif"
  },
  {
    "id": 96,
    "emoji": "👨‍💼",
    "name": "Dr. Bolem Sai Chandana",
    "title": "Associate Professor Grade 2",
    "dept": "SCOPE",
    "deptLabel": "School of Computer Science and Engineering (SCOPE)",
    "phone": "+91 9959968477",
    "email": "saichandana.bolem@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "CB: G04-B",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Bolem_Sai_Chandana_70371_IMG_4755_SCOPE_66b24c6af9.avif"
  },
  {
    "id": 97,
    "emoji": "👩‍💼",
    "name": "Dr. M. Sucharitha",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5854",
    "email": "sucharitha.jackson@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "108, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_M_Sucharitha_SENSE_1894_a69e38a8ec.avif"
  },
  {
    "id": 98,
    "emoji": "🧑‍🏫",
    "name": "Dr. Neeraj Kumar Misra",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5862",
    "email": "neeraj.misra@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "163, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/70442_Dr_Neeraj_Kumar_Misra_SENSE_1152_9af51d0886.avif"
  },
  {
    "id": 99,
    "emoji": "🧑‍💻",
    "name": "Dr. Ashish Gupta",
    "title": "Associate Professor Grade 2",
    "dept": "SENSE",
    "deptLabel": "School of Electronics Engineering (SENSE)",
    "phone": "+91 5867",
    "email": "ashish.gupta@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "328-H, AB-1",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Ashish_Gupta_70443_IMG_2583_SENSE_600184ab15.avif"
  },
  {
    "id": 100,
    "emoji": "👩‍💻",
    "name": "Dr. Virendra Kumar Verma",
    "title": "Associate Professor Grade 2",
    "dept": "SAS",
    "deptLabel": "School of Advanced Science (SAS)",
    "phone": "+91 5869",
    "email": "virendra.verma@vitap.ac.in",
    "free": [],
    "busy": [],
    "campusStatus": "on-campus",
    "officeAddress": "116-D, CB",
    "photo": "https://vitap-backend.s3.ap-south-1.amazonaws.com/Dr_Virendra_Kumar_Verma_SAS_1443_afdea6163d.avif"
  }
];

const LOCAL_PROJECTS = {
  1:  [
    { id:"p1-1",  title:"Smart Campus Attendance System",          desc:"Real-time face-recognition attendance tracking using OpenCV and Flask, integrated with the university DBMS.",                    tags:["Python","OpenCV","Flask","MySQL"],           status:"ongoing",   students:4, year:"2024-25" },
    { id:"p1-2",  title:"NLP-Based Student Query Chatbot",         desc:"A fine-tuned language model chatbot to answer student FAQs about university policies and schedules.",                           tags:["NLP","Transformers","React"],                status:"completed", students:3, year:"2023-24" },
    { id:"p1-3",  title:"Distributed File Sharing System",         desc:"Peer-to-peer file sharing with encryption for secure document exchange between students and faculty.",                           tags:["Java","Sockets","Cryptography"],             status:"open",      students:0, year:"2025-26" },
  ],
  2:  [
    { id:"p2-1",  title:"Blockchain-Based Certificate Verification",desc:"Issuing and verifying academic certificates on a permissioned blockchain to prevent forgery.",                                  tags:["Blockchain","Solidity","Web3"],              status:"ongoing",   students:5, year:"2024-25" },
    { id:"p2-2",  title:"Graph-Based Course Recommendation",        desc:"Using knowledge graphs to recommend elective courses based on a student academic history and career goals.",                    tags:["Graph DB","ML","Neo4j"],                     status:"open",      students:0, year:"2025-26" },
  ],
  3:  [
    { id:"p3-1",  title:"IoT-Based Smart Classroom",                desc:"Sensor network controlling lighting, fans, and attendance boards in seminar halls, visualized on a real-time dashboard.",       tags:["IoT","Arduino","MQTT","React"],              status:"ongoing",   students:3, year:"2024-25" },
    { id:"p3-2",  title:"Spectrum Sensing for Cognitive Radio",      desc:"Machine-learning based spectrum sensing algorithm for dynamic spectrum access in cognitive radio networks.",                    tags:["Signal Processing","Python","ML"],           status:"completed", students:2, year:"2023-24" },
  ],
  4:  [
    { id:"p4-1",  title:"CAD Automation for Gear Design",            desc:"Automated MATLAB scripts to generate and optimize spur gear profiles based on load and torque specifications.",               tags:["MATLAB","CAD","Optimization"],               status:"completed", students:4, year:"2023-24" },
    { id:"p4-2",  title:"3D Printed Prosthetic Hand",                 desc:"Low-cost prosthetic hand with servo-controlled fingers, driven by EMG signals from the residual limb.",                      tags:["3D Printing","EMG","Arduino"],               status:"ongoing",   students:3, year:"2024-25" },
    { id:"p4-3",  title:"Solar Tracker Mechanism",                    desc:"A single-axis solar panel tracking system using LDR sensors to maximize energy capture throughout the day.",                 tags:["Mechanical","Electronics","Energy"],         status:"open",      students:0, year:"2025-26" },
  ],
  5:  [
    { id:"p5-1",  title:"Cryptographic Key Generation via Chaos",    desc:"Generating pseudo-random keys using chaotic dynamical systems for lightweight encryption.",                                   tags:["Cryptography","Chaos Theory","Python"],      status:"completed", students:2, year:"2023-24" },
    { id:"p5-2",  title:"Mathematical Modelling of Epidemic Spread", desc:"SIR/SEIR model implementation and simulation to study infection dynamics in university populations.",                         tags:["Differential Equations","Simulation","R"],  status:"ongoing",   students:3, year:"2024-25" },
  ],
  6:  [
    { id:"p6-1",  title:"Structural Health Monitoring System",       desc:"Wireless sensor-based monitoring of bridge structures to detect micro-cracks and stress anomalies in real time.",             tags:["IoT","Structural Engg","Sensors"],           status:"ongoing",   students:5, year:"2024-25" },
    { id:"p6-2",  title:"GIS-Based Urban Flood Mapping",             desc:"Using satellite imagery and GIS tools to identify flood-prone zones and plan drainage infrastructure.",                       tags:["GIS","Python","Remote Sensing"],             status:"open",      students:0, year:"2025-26" },
  ],
  7:  [
    { id:"p7-1",  title:"Student Performance Prediction",            desc:"ML model predicting student performance using attendance, assignments, and mid-term scores to flag at-risk students early.",  tags:["ML","Scikit-learn","Django"],                status:"ongoing",   students:4, year:"2024-25" },
    { id:"p7-2",  title:"Automated Code Review Tool",                desc:"Static analysis tool that reviews student code submissions for correctness, efficiency, and style violations.",               tags:["AST","Python","React"],                      status:"open",      students:0, year:"2025-26" },
  ],
  8:  [
    { id:"p8-1",  title:"VLSI Design of Low-Power ALU",              desc:"Gate-level design and simulation of a low-power 8-bit ALU using Cadence tools targeting sub-threshold operation.",           tags:["VLSI","Cadence","Verilog"],                  status:"completed", students:2, year:"2023-24" },
    { id:"p8-2",  title:"Wireless Body Area Network for Health",     desc:"WBAN architecture for continuous patient monitoring, transmitting vitals to a mobile app over BLE.",                          tags:["BLE","Embedded C","Healthcare"],             status:"ongoing",   students:3, year:"2024-25" },
  ],
  9:  [
    { id:"p9-1",  title:"Numerical Methods Visualizer",              desc:"Interactive web app to visualize root-finding algorithms, numerical integration, and ODE solvers step by step.",             tags:["JavaScript","D3.js","Algorithms"],           status:"completed", students:2, year:"2023-24" },
    { id:"p9-2",  title:"Fractal Geometry Art Generator",            desc:"Generating and animating fractal patterns (Mandelbrot, Julia sets) using GPU-accelerated WebGL shaders.",                    tags:["WebGL","GLSL","Math"],                       status:"open",      students:0, year:"2025-26" },
  ],
  10: [
    { id:"p10-1", title:"CFD Analysis of Aerodynamic Bodies",        desc:"OpenFOAM-based CFD simulation of drag and lift on various vehicle profiles to guide lightweight design.",                     tags:["CFD","OpenFOAM","Python"],                   status:"ongoing",   students:4, year:"2024-25" },
    { id:"p10-2", title:"Autonomous Line-Following Robot",           desc:"PID-controlled differential drive robot that follows a track using IR sensors and adapts to varying line widths.",            tags:["Arduino","PID","C++"],                       status:"completed", students:3, year:"2023-24" },
  ],
  11: [
    { id:"p11-1", title:"Rainwater Harvesting Simulation",           desc:"Simulation model for optimizing rainwater collection and storage in urban residential complexes.",                            tags:["MATLAB","Water Resources","GIS"],            status:"completed", students:3, year:"2023-24" },
    { id:"p11-2", title:"Smart Traffic Signal System",               desc:"Computer vision based adaptive traffic signal control that adjusts green-time based on real-time vehicle density.",           tags:["OpenCV","Raspberry Pi","IoT"],               status:"open",      students:0, year:"2025-26" },
  ],
  12: [
    { id:"p12-1", title:"Compiler Design: Mini-Language",            desc:"End-to-end compiler for a custom teaching language — lexer, parser, semantic analyser, and bytecode generator.",             tags:["Compiler Design","C","LLVM"],                status:"ongoing",   students:5, year:"2024-25" },
    { id:"p12-2", title:"Federated Learning for Privacy",            desc:"Decentralized ML training across devices without sharing raw data, tested on medical image classification.",                  tags:["Federated Learning","PyTorch","Privacy"],    status:"completed", students:4, year:"2023-24" },
    { id:"p12-3", title:"Operating System Scheduler Simulator",      desc:"Web-based interactive simulator for CPU scheduling algorithms — FCFS, SJF, RR, and Priority with Gantt charts.",            tags:["OS","React","Algorithms"],                   status:"open",      students:0, year:"2025-26" },
  ],
};

// ── Helpers ───────────────────────────────────────────────────

/** Try a fetch; on any network/HTTP error resolve to null instead of rejecting. */
function tryFetch(url) {
  return fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
}

/** Apply ?q and ?dept filters locally (mirrors backend logic). */
function localFilterFaculty(params = {}) {
  let result = LOCAL_FACULTY;
  if (params.dept) {
    const depts = params.dept.toUpperCase().split(",");
    result = result.filter((f) => depts.includes(f.dept));
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.dept.toLowerCase().includes(q) ||
        f.deptLabel.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q)
    );
  }
  return { count: result.length, data: result };
}

// ── Public API object ─────────────────────────────────────────
const api = {
  /** Get all faculty, with optional { q, dept } params. */
  getFaculty(params = {}) {
    const qs  = new URLSearchParams(params).toString();
    const url = qs ? `${API_BASE}/faculty?${qs}` : `${API_BASE}/faculty`;
    return tryFetch(url).then((json) => json ?? localFilterFaculty(params));
  },

  /** Get a single faculty member by numeric ID. */
  getFacultyById(id) {
    return tryFetch(`${API_BASE}/faculty/${id}`).then((json) => {
      if (json) return json;
      const member = LOCAL_FACULTY.find((f) => f.id === id);
      if (!member) throw new Error(`Faculty ${id} not found`);
      return member;
    });
  },

  /** Get all projects across all faculty, with optional { status } param. */
  getAllProjects(params = {}) {
    const qs  = new URLSearchParams(params).toString();
    const url = qs ? `${API_BASE}/projects?${qs}` : `${API_BASE}/projects`;
    return tryFetch(url).then((json) => {
      if (json) return json;
      // Build flat list from local data, grouped by faculty department
      const all = [];
      Object.entries(LOCAL_PROJECTS).forEach(([fid, projs]) => {
        const member = LOCAL_FACULTY.find((f) => f.id === parseInt(fid));
        const deptLabel = member?.deptLabel || "Unknown Department";
        projs.forEach((p) =>
          all.push({ 
            ...p, 
            facultyId: parseInt(fid), 
            facultyName: member?.name, 
            department: deptLabel
          })
        );
      });
      const result = params.status ? all.filter((p) => p.status === params.status) : all;
      return { count: result.length, data: result };
    });
  },

  /** Get all projects for a specific faculty member. */
  getProjectsByFaculty(facultyId) {
    return tryFetch(`${API_BASE}/projects/faculty/${facultyId}`).then((json) => {
      if (json) return json;
      const member   = LOCAL_FACULTY.find((f) => f.id === facultyId);
      const projects = LOCAL_PROJECTS[facultyId] || [];
      return { 
        faculty: { 
          id: member?.id,
          name: member?.name,
          email: member?.email,
          department: member?.deptLabel || "Unknown",
          title: member?.title,
          emoji: member?.emoji,
        }, 
        count: projects.length, 
        data: projects 
      };
    });
  },

  /** Register for a project (mock with 20s selection timer). */
  registerForProject(projectId, providedTitle = null, providedFacultyName = null) {
    return new Promise((resolve) => {
      // Find project info for the request entry
      let projectTitle = providedTitle || "Project";
      let facultyName = providedFacultyName || "Unknown Faculty";
      
      // Fallback lookup in local data if not provided
      if (!providedTitle || !providedFacultyName) {
        for (const [fid, projs] of Object.entries(LOCAL_PROJECTS)) {
          const found = projs.find(p => p.id === projectId);
          if (found) {
            projectTitle = providedTitle || found.title;
            const member = LOCAL_FACULTY.find(f => f.id === parseInt(fid));
            facultyName = providedFacultyName || (member ? member.name : facultyName);
            break;
          }
        }
      }

      const newRequest = {
        id: "reg-" + Date.now(),
        type: "Registration",
        projectId: projectId,
        projectTitle: projectTitle,
        facultyName: facultyName,
        timestamp: new Date().toISOString(),
        status: "pending"
      };

      state.requests.unshift(newRequest);
      this._persistRequests();
      
      // Notify UI
      if (window.renderRequestHistory) renderRequestHistory();

      // Selection Timer (20 seconds)
      setTimeout(() => {
        // 60% chance of acceptance, 40% chance of rejection for a "realistic" feel
        const finalStatus = Math.random() > 0.4 ? "accepted" : "rejected";
        
        this.updateRequestStatus(newRequest.id, finalStatus);
        
        const acceptMsgs = [
          `Dear student, I am pleased to inform you that you have been selected for the "${newRequest.projectTitle}" project. Welcome aboard!`,
          `I've reviewed your profile and would love to have you on the "${newRequest.projectTitle}" team. Let's get started soon!`,
          `Congratulations! Your registration for "${newRequest.projectTitle}" has been approved. Meet me in my office next Monday.`
        ];
        
        const rejectMsgs = [
          `Thank you for your interest in "${newRequest.projectTitle}". Unfortunately, we have decided to move forward with other candidates at this time.`,
          `The slots for "${newRequest.projectTitle}" are currently full. I encourage you to apply for other projects in our department.`,
          `We appreciate your application, but we are looking for students with different specialized skills for "${newRequest.projectTitle}" right now.`
        ];

        let responseMsg = finalStatus === "accepted" 
          ? acceptMsgs[Math.floor(Math.random() * acceptMsgs.length)]
          : rejectMsgs[Math.floor(Math.random() * rejectMsgs.length)];

        if (finalStatus === "accepted") {
          state.registeredProjects.add(projectId);
          localStorage.setItem(
            "registeredProjects", 
            JSON.stringify(Array.from(state.registeredProjects))
          );
        }

        // Add an actual "Message" from the professor to the history
        const professorResponse = {
          id: "msg-res-" + Date.now(),
          type: "Message",
          facultyName: newRequest.facultyName,
          subject: `RESPONSE: ${newRequest.projectTitle}`,
          message: responseMsg,
          timestamp: new Date().toISOString(),
          status: "accepted", // Responses are always "accepted" as they are the final word
          isIncoming: true    // New flag to distinguish
        };
        state.requests.unshift(professorResponse);
        this._persistRequests();

        // Notify user
        if (typeof interactions !== 'undefined' && interactions.showToast) {
          const type = finalStatus === 'accepted' ? 'success' : 'error';
          interactions.showToast(finalStatus === 'accepted' ? 'Selected for project!' : 'Registration rejected', type);
        }

        // Re-render
        if (window.renderRequestHistory) renderRequestHistory();

        // Re-render project views
        if (window.openFacultyProjects && state.currentFacultyId) {
          openFacultyProjects(state.currentFacultyId);
        } else if (window.openMyProjects) {
          openMyProjects();
        }
      }, 20000);

      resolve({ success: true, requestId: newRequest.id });
    });
  },

  /** Unregister from a project. */
  unregisterFromProject(projectId) {
    return new Promise((resolve) => {
      // Update state
      state.registeredProjects.delete(projectId);
      
      // Persist to localStorage
      localStorage.setItem(
        "registeredProjects", 
        JSON.stringify(Array.from(state.registeredProjects))
      );
      
      // Mock network delay
      setTimeout(() => {
        resolve({ success: true, projectId });
      }, 300);
    });
  },

  /** Get only registered projects across all faculty. */
  getRegisteredProjects() {
    return this.getAllProjects().then(({ data: allProjects }) => {
      const registered = allProjects.filter(p => state.registeredProjects.has(p.id));
      return { count: registered.length, data: registered };
    });
  },

  /** Send a request (meeting or message) and trigger auto-resolution. */
  sendRequest(requestData) {
    return new Promise((resolve) => {
      const newRequest = {
        id: "req-" + Date.now(),
        timestamp: new Date().toISOString(),
        status: "pending",
        ...requestData
      };

      state.requests.unshift(newRequest);
      this._persistRequests();
      
      // Auto-resolution after 1.5 seconds for realistic chat feel
      setTimeout(() => {
        let finalStatus = "accepted";
        let responseMsg = "";

        if (newRequest.type === 'Meeting') {
            finalStatus = Math.random() > 0.3 ? "accepted" : "rejected";
            this.updateRequestStatus(newRequest.id, finalStatus);
            responseMsg = finalStatus === 'accepted' 
              ? `I am available for our meeting request regarding "${newRequest.reason || 'our upcoming project'}". See you then.`
              : `I'm sorry, my schedule is quite packed. Please check back next week.`;
        } else {
            // AI Chatbot logic based on message content
            const msgLower = (newRequest.message || "").toLowerCase();
            this.updateRequestStatus(newRequest.id, "accepted");

            if (msgLower.includes("hello") || msgLower.includes("hi")) {
                responseMsg = `Hello! How can I help you today?`;
            } else if (msgLower.includes("project") || msgLower.includes("research") || msgLower.includes("thesis")) {
                responseMsg = `That sounds interesting. Have you prepared a proposal document for this?`;
            } else if (msgLower.includes("meeting") || msgLower.includes("meet")) {
                responseMsg = `I'd be happy to meet. Please use the "Request Meeting" button to officially book a slot.`;
            } else if (msgLower.includes("grade") || msgLower.includes("assignment") || msgLower.includes("exam")) {
                responseMsg = `Grades/marks are typically updated by the end of the week. Let me know if you see any discrepancies by Monday.`;
            } else if (msgLower.includes("thank")) {
                responseMsg = `You're welcome! Let me know if you need anything else.`;
            } else if (msgLower.includes("help") || msgLower.includes("stuck") || msgLower.includes("error")) {
                responseMsg = `I understand you're facing an issue. Please come to my office hours or share the specific details so I can take a look.`;
            } else {
                const genericResponses = [
                    "I see. Could you provide a bit more detail on that?",
                    "Understood. Let's discuss this further during my next office hours.",
                    `I've noted that down. I'll get back to you shortly regarding "${newRequest.subject || 'this point'}".`,
                    "Thanks for reaching out. Please send me an email with the specifics and we can take it from there."
                ];
                responseMsg = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            }
        }

        const professorResponse = {
          id: "msg-res-" + Date.now(),
          type: "Message",
          facultyName: newRequest.facultyName,
          subject: newRequest.type === 'Meeting' ? `RE: Meeting Request` : `RE: ${newRequest.subject || 'Message'}`,
          message: responseMsg,
          timestamp: new Date().toISOString(),
          status: "accepted",
          isIncoming: true
        };
        state.requests.unshift(professorResponse);
        this._persistRequests();
        
        // Notify user via toast if it's a meeting (we don't need a toast for every chat message to avoid spam)
        if (newRequest.type === 'Meeting' && typeof interactions !== 'undefined' && interactions.showToast) {
          const type = finalStatus === 'accepted' ? 'success' : 'error';
          interactions.showToast(`Meeting with ${newRequest.facultyName} was ${finalStatus}.`, type);
        }
        
        if (window.renderRequestHistory) window.renderRequestHistory();
      }, 1500);

      resolve(newRequest);
    });
  },

  /** Update status of a specific request. */
  updateRequestStatus(requestId, status) {
    const req = state.requests.find(r => r.id === requestId);
    if (req) {
      req.status = status;
      this._persistRequests();
      
      // Update UI if relevant helpers exist
      if (window.renderRequestHistory) renderRequestHistory();
      if (state.currentFacultyId && window.openFacultyProjects) {
        // Redraw current faculty view to show status change if same faculty
        const currentFaculty = state.allFaculty.find(f => f.id === state.currentFacultyId);
        if (currentFaculty && currentFaculty.name === req.facultyName) {
           openFacultyProjects(state.currentFacultyId);
        }
      }
    }
  },

  /** Clear all request history. */
  clearRequests() {
    state.requests = [];
    this._persistRequests();
    if (window.renderRequestHistory) renderRequestHistory();
    // Refresh current faculty view if open
    if (state.currentFacultyId && window.openFacultyProjects) {
      openFacultyProjects(state.currentFacultyId);
    }
  },

  _persistRequests() {
    localStorage.setItem("requests", JSON.stringify(state.requests));
  }
};
