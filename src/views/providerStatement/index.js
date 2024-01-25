import '@styles/react/libs/flatpickr/flatpickr.scss'
import { trackPromise } from 'react-promise-tracker'
import { Button } from 'reactstrap'
import { apiConfig } from '../../@core/api/serviceConfig'
const ProviderStatement = () => {
  const downloadStatement = () => {
    trackPromise(apiConfig.post('/corporatefundstatement').then((data) => {
      const header = ['Serial No,Year,Month,Details,Debit Amount,Credit Amount,Balance Amount,Credit Limit,Fees Type,TPA Fees,Member Claim Count\r\n'];
      const keys = ['sl', 'year', 'month', 'details', 'drAmount', 'crAmount', 'balanceAmount', 'creditLimit', 'feesType', 'tpaFees', 'memberClaimCount']
      let csvContent = "data:text/csv;charset=utf-8," + header + data.map(e => keys.map(key => e[key]).join(',')).join("\r\n");


      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);
    }).catch())
  };

  return (
    <div>
      <Button color='primary' onClick={() => { downloadStatement() }}>Download Statement</Button>
    </div >
  )
}

export default ProviderStatement