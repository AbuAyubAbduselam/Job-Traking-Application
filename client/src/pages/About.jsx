import { Card, List, Layout } from "antd";

const { Header, Content } = Layout;

const About = () => {
  return (
    <Layout>
      <Header className="flex justify-center bg-emerald-500 h-20">
        <p className="text-5xl text-white">ማዕከላችን</p>
      </Header>
      <Content className="min-h-screen mx-10 my-10">
        <Card
          title={<span className="text-4xl"> ራዕይ</span>}
          className="my-4 text-2xl"
        >
          በአካባቢው የሚገኙ ሕጻናትና ወጣቶች  ሕግና ሥርዓት ዐውቀውና አክብረው በሃይማኖትና በምግባር ጸንተው
          በእውቀታቸው፣በገንዘባቸው፣በጉልበታቸው እንዲሁም በዳእዋቸው ሲያገለግሉ እና በዓላማዊው ትምህርታቸው ውጤታማ ሆነው
          ማየት፣በተጨማሪም ከ 2016 ጀምሮ ማእከሉን ለ 500 ተማሪዎች ዝግጁ ማድረግ 
        </Card>

        <Card
          title={<span className="text-4xl"> ዓላማ</span>}
          className="my-4 text-2xl"
        >
          ወቅቱን ያገናዘቡዘመኑን ለመቅደም በሚያስችል መልኩ   ዘመናዊ የትምህርት ስርዓት ከአገረ ሰብ ወግ እና ልማዶች
          ጋር በማዋሃድየበፊቱ ሳይኖር የአሁኑ ሊኖር ስለማይችል ከሁሉ በፊት የቀድሞ ትውልዶች ላቆዩልን ጠቃሚ  እሴቶች
          ተገቢውን ዕውቅና በመስጠት  ትውፊታዊ የትምህርት ስርዓት በመጥቀስ መንፈሳዊ የማስተማሪያ ዘዴዎችን በመጠቀም
          ሕጻናትና ወጣቶች ቁርአን እና ሌሎች የ ሃይማኖቱ ሥርዓተ እምነትና  ትውፊት እንዲያውቁና እንዲጠብቁ ማስተማር
        </Card>

        <Card
          title={<span className="text-4xl"> ተልዕኮ</span>}
          className="my-4 text-2xl"
        >
          በኢስላማዊ ባህሪ የታነጡ ሕጻናትና ወጣቶች ቁርአንን በእይታ በሂፍዝ በተጅዊድ በማዳረስ ተተኪዎችን በማፍራት
          ተምሳሌት መሆን
        </Card>

        <Card
          title={<span className="text-4xl">የማዕከሉ እሴቶች</span>}
          className="my-4"
        >
          <List
            bordered
            className="text-2xl"
            dataSource={[
              "ኢኽላስ",
              "አገልጋይነትና በጎ ፍቃደኝነት",
              "ልህቀት፡- በላቀ የአሰራርና የአገልግሎት አሰጣጥ ስራን ማከናወን",
              "ታማኝነት",
              "ግልፅነትና ተጠያቂነት",
              "አካታችነትና አሳታፊነት",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default About;
