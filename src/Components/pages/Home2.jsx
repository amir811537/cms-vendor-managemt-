import {
  Page,
  PDFViewer,
  View,
  Document,
  Text,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../assets/logo-fresh.png";
import NotoSerifBengali from "../../../public/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf";

Font.register({ family: "NotoSerifBengali", src: NotoSerifBengali });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "NotoSerifBengali",
    fontSize: 12,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    padding: 5,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#3533CA",
    color: "white",
    textAlign: "center",
    padding: 5,
    marginTop: 20,
  },
});

const CustomerDetail = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>ফ্রেশ কাট চিকেন সার্ভিস</Text>
      </View>

      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={styles.tableCell}>তারিখ</Text>
        <Text style={styles.tableCell}>নাম</Text>
        <Text style={styles.tableCell}>ঠিকানা</Text>
        <Text style={styles.tableCell}>ফোন</Text>
        <Text style={styles.tableCell}>অর্ডার</Text>
        <Text style={styles.tableCell}>মূল্য</Text>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.date || "—"}</Text>
          <Text style={styles.tableCell}>{item.name}</Text>
          <Text style={styles.tableCell}>{item.location || item.Location}</Text>
          <Text style={styles.tableCell}>{item.phone || "N/A"}</Text>
          <Text style={styles.tableCell}>
            {item.orderHistory || item.OrderDescription}
          </Text>
          <Text style={styles.tableCell}>{item.sale}৳</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text>
          মোট মূল্য:{" "}
          {data.reduce((acc, cur) => acc + parseFloat(cur.sale || 0), 0)} টাকা
        </Text>
      </View>
    </Page>
  </Document>
);

const Home2 = ({ allData }) => {
  return (
    <div className="w-full flex justify-center">
      <PDFViewer width="100%" height={800}>
        <CustomerDetail data={allData} />
      </PDFViewer>
    </div>
  );
};

export { CustomerDetail };
export default Home2;
