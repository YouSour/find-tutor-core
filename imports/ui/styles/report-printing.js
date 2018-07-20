const cssPrinting = `
/* moul-regular - khmer */
@font-face {
  font-family: 'Moul';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts-kh/moul-v8-khmer-regular.eot');
  /* IE9 Compat Modes */
  src: local('Moul'),
    url('/fonts-kh/moul-v8-khmer-regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts-kh/moul-v8-khmer-regular.woff2') format('woff2'),
    url('/fonts-kh/moul-v8-khmer-regular.woff') format('woff'),
    url('/fonts-kh/moul-v8-khmer-regular.ttf') format('truetype'),
    url('/fonts-kh/moul-v8-khmer-regular.svg#Moul') format('svg');
  /* Legacy iOS */
}

/* freehand-regular - khmer */
@font-face {
  font-family: 'Freehand';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts-kh/freehand-v8-khmer-regular.eot');
  /* IE9 Compat Modes */
  src: local('Freehand'),
    url('/fonts-kh/freehand-v8-khmer-regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts-kh/freehand-v8-khmer-regular.woff2') format('woff2'),
    url('/fonts-kh/freehand-v8-khmer-regular.woff') format('woff'),
    url('/fonts-kh/freehand-v8-khmer-regular.ttf') format('truetype'),
    url('/fonts-kh/freehand-v8-khmer-regular.svg#Freehand') format('svg');
  /* Legacy iOS */
}

/* battambang-regular - khmer */
@font-face {
  font-family: 'Battambang';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts-kh/battambang-v9-khmer-regular.eot');
  /* IE9 Compat Modes */
  src: local('Battambang'),
    url('/fonts-kh/battambang-v9-khmer-regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts-kh/battambang-v9-khmer-regular.woff2') format('woff2'),
    url('/fonts-kh/battambang-v9-khmer-regular.woff') format('woff'),
    url('/fonts-kh/battambang-v9-khmer-regular.ttf') format('truetype'),
    url('/fonts-kh/battambang-v9-khmer-regular.svg#Battambang') format('svg');
  /* Legacy iOS */
}

.report-card {
  width: 100%;
}

.report-card .card-header {
  margin: -7px 0px 20px;
}

.report-card .card-header .header-left {
  float: left;
  /*margin-top: -7px;*/
}

.report-card .card-header .header-right {
  float: right;
  /*margin-top: -7px;*/
}

.part-title {
    text-transform: capitalize;
}

.report-body {
  font-size: 12px;
  /* color: #1f2f3d; */
}

.report-body .header {
  text-align: center;
  padding-bottom: 10px;
  /* color: #909399; */
}

.report-body>.header>.company-name {
  font-size: 20px;
  font-weight: 500;
  /* font-family: Moul, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif !important; */
}

.report-body .header .report-name {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  /* font-family: Moul, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif !important; */
}

.report-body .header .report-period {
  font-size: 14px;
  font-weight: 500;
  padding-top: 10px;
}

.report-body .filter {
  padding-bottom: 15px;
}

.report-body .filter .title {
  font-weight: 500;
  font-size: 12px
}

.report-body .content {
  padding-bottom: 5px;
}

/* Time Stamp */
.report-body .timestamp {
  font-size: 10px;
  font-weight: 300;
  font-style: italic;
  padding-bottom: 10px;
}


/* Footer */
.report-body .footer {
  padding-bottom: 10px;
}

.report-body .footer .title {
  font-weight: 600;
}

.report-body .signature {
  padding-top: 20px;
  clear: both;
  text-align: center;
  font-weight: 400;
}

/* Grid */
.colspan-6{
  flex-direction: column;
  width: 22%;
  font-size: 12px;
  float: left
}

.colspan-8{
  flex-direction: column;
  width: 30%;
  font-size: 12px;
  float: left
}

.colspan-12{
  flex-direction: column;
  width: 45%;
  font-size: 12px;
  float: left
}

.signature-span {
  flex-direction: column;
  width: 30%;
  float: left;
  font-size: 12px;
  text-align: center;
  display: flex
}


/* Note */
.note {
  border: 1px solid #2e2e2e;
  border-radius: 4px;
  color: #2e2e2e;
  font-size: 12px;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  margin-bottom: 22px;
  padding: 10px 15px
}

.report-body .not-btn {
  padding-left: 7px;
}

.report-body .note-textarea {
  text-align: right;
  margin: 0;
}


/* Table Content */
.report-body .table-content {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  line-height: 23px;
}

.report-body .table-content th {
  border-bottom: 1px solid #ddd;
  padding: 3px 5px;
  font-size: 12px;
  background-color: #f5f7fa
}

.report-body .table-content td {
  border-bottom: 1px solid #ddd;
  padding: 3px 5px;
  font-size: 12px !important;
}

.report-body .table-content tbody tr th {
  background-color: #fff !important;
}

/* Paper Size */
.a4-p {
  width: 21cm
}

.a4-l {
  width: 29.7cm
}

.a5-p {
  width: 14.8cm
}

.a5-l {
  width: 21cm
}

.mini{
  width: 8cm
}


/* Text Align */
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
`

export default cssPrinting
