var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const CompanyMasterSchema   = new Schema({
  company_code:   { type: String, required: true, unique: true },
  company_name:   { type: String, required: true, unique: false },
  address:        { type: String, required: true, unique: false },
  mail:           { type: String, required: true, unique: false },
  created:        { type: Date,   required: true, default: Date.now }
});

export default mongoose.model('CompanyMaster', CompanyMasterSchema);