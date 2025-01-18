import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  companyInfo: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
    alignSelf: "center",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ddd",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: "center",
  },
});

// Printable Asset Component
const PrintableAsset = ({ asset, companyInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Information */}
      <View style={styles.companyInfo}>
        <Text>{companyInfo.companyName}</Text>
        <Image style={styles.logo} src={companyInfo.companyLogo} />
      </View>

      {/* Asset Details */}
      <View style={styles.section}>
        <Text>Asset Name: {asset.assetName}</Text>
        <Text>Asset Type: {asset.assetType}</Text>
        <Text>Requested By: {asset.reqName}</Text>
        <Text>
          Request Date: {format(new Date(asset.requestDate), "dd/MM/yyyy")}
        </Text>
        <Text>
          Approval Date:{" "}
          {asset?.approvalDate &&
            format(new Date(asset.approvalDate), "dd/MM/yyyy")}
        </Text>
        <Text>Status: {asset.status}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Printed on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

export default PrintableAsset;
