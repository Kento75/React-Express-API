import CompanyMaster from '../models/companyMaster';
import { getForwardMatchString } from '../utils';


// 会社マスタ検索処理
export function companyFind(req, res) {
  var searchcondition = {};
  // check sql injection
  if( typeof req.body.searchWord === "string" ){
    searchcondition = {
      company_code: getForwardMatchString(req.body.searchWord)
    };
  }
  else {
    return res.status(500).send();
  }
  CompanyMaster.find(searchcondition).exec((err, companyList) => {
  if (err) {
    console.log('companyMasterController/find error');
    console.log(err);
    return res.status(500).send();
  }
  return res.status(200).json({companyList});
  });
}

// 会社マスタ登録処理
export function companyAdd(req, res) {
  const tmpInsertData = new CompanyMaster({
    company_code: req.body.company_code,
    company_name: req.body.company_name,    
    address:      req.body.address,    
    mail:         req.body.mail,    
  });

  return tmpInsertData.save((saveErr) => {
    if (saveErr){
      console.log("companyMasterController/add saveErr");
      console.log(saveErr);
      return res.status(500).send(saveErr);
    }
    tmpInsertData.isUpdate = false;
    return res.status(200).json({insertData: tmpInsertData});
  });
}

export default {
  companyFind,
  companyAdd
};