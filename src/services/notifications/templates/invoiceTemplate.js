import path from 'path'
const invoiceTemplate = document => `
<div style=" width: 50%;float: left;padding: 0px 15px; margin-top:2%; font-Family:Verdana; font-size:12px;">
  <div><img src="${path.join(
    __dirname
  )}/universitylogo.png" alt="Logo" width="60px"/></div>
  <div style="margin-top:10px, font-size:16px; font-weight:600; margin-bottom:10px;">${
  document.company.name
}</div>
<div style="margin-top:10px, text-align: center;">${
  document.company.customerName
}</div>
<div style="margin-top:10px, text-align: center;">${
  document.company.orderId
}</div>
</div>
<div style="width: 20%; float: right; padding: 0px 15px">
  <ul style="padding: 0px;text-align: right;color: gray; font-Family:Verdana; font-size:12px;">
    <li style="margin-bottom: 5px;list-style: none">${
  document.company.name
}</li>
    <li style="margin-bottom: 5px; list-style: none">${
  document.company.address
}</li>
    <li style="margin-bottom: 5px;list-style: none">
    ${document.company.phone}
    </li>
    <li style="margin-bottom: 5px;list-style: none">
    ${document.company.email}
    </li>
    <li style="margin-bottom: 5px;list-style: none">
    ${document.company.gst}
    </li>
  </ul>
</div>
<br style="clear: both" />
<div style="margin: 5% 0px">
  <table width="100%" style="font-size: 12px;font-Family:Verdana;">
    <tr>
      <th
        width="20%"
        style="font-size: 11px; color:#ffffff; border: none;padding: 0px 10px; background:#4badd0; text-align:left;border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"
      >
        Package Name
      </th>
      <th
        width="5%"
        style="font-size: 11px; color:#ffffff; border: none; padding:10px 10px; background:#4badd0; text-align:left;border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"
      >
        SKU
      </th>
      <th
        width="35%"
        style="font-size: 11px; color:#ffffff; border: none; padding: 10px 10px; background:#4badd0; text-align:left;border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"
      >
        Description
      </th>
      <th
      width="20%"
        style="font-size: 11px; color:#ffffff; border: none; padding: 10px 10px; background:#4badd0; text-align:left;border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"
      >
        Allowed Views
      </th>
      <th
      width="20%"
        style="font-size: 11px; color:#ffffff;text-align:right; border: none; padding: 10px 10px; background:#4badd0; text-align:left;border-top: 1px solid #cccccc;border-bottom: 1px solid #cccccc;"
      >
        Price
      </th>
    </tr>
    <tr>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          border-bottom: 1px solid #cccccc
        "
      >
      ${document.items.name}
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          border-bottom: 1px solid #cccccc
        "
      >
      ${document.items.sku}
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          border-bottom: 1px solid #cccccc
        "
      >
      ${document.items.description}
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          border-bottom: 1px solid #cccccc
        "
      >
      ${document.items.views}
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          text-align: right;
          border-bottom: 1px solid #cccccc
        "
      >
      ${document.items.price}
      </td>
    </tr>
    <tr>
      <td />
      <td />
      <td />
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 10px 0
        "
      >
        Sub Total
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          text-align: right
        "
      >
      ${document.finalData.subTotal}
      </td>
    </tr>
    <tr>
      <td />
      <td />
      <td />
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 10px 0
        "
      >
        Tax
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          text-align: right
        "
      >
      ${document.finalData.tax}%
      </td>
    </tr>
    <tr>
      <td />
      <td />
      <td />
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          border-top: 1px solid #cccccc;
          font-weight: 600
        "
      >
        Total
      </td>
      <td
        style="
          font-size: 12px;
          border: none;
          color: gray;
          padding: 5px 10px;
          text-align: right;
          border-top: 1px solid #cccccc;
          font-weight: 600
        "
      >
      ${document.finalData.total}
      </td>
    </tr>
  </table>
</div>
<div>
<div style="padding-left: 15px;font-size: 13px;font-Family:Verdana;">Terms & Conditions</div>
<div style="font-size: 12px;font-Family:Verdana;">${
  document.customer.termsConditions
}</div>
</div>
</div>`

export default invoiceTemplate
