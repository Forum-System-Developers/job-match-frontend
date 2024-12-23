import Header from "@/layouts/headers/header";
import HeroBanner from "./components/hero-banners/hero-banner";
import CategorySection from "./components/category/category-section";
import HowItWorks from "./components/how-it-works/how-it-works";
import FeatureTwo from "./components/features/feature-two";
import FancyBanner from "./components/fancy-banner/fancy-banner";
import JobPortalIntro from "./components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import Wrapper from "@/layouts/wrapper";

export default function Home() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      {/* hero banner start */}
      <HeroBanner />
      {/* hero banner end */}

      {/* category section start */}
      <CategorySection />
      {/* category section end */}

      {/* feature one start */}
      {/* <FeatureOne /> */}
      {/* feature one end */}

      {/* how works start */}
      <HowItWorks />
      {/* how works end */}

      {/* text feature two start */}
      <FeatureTwo />
      {/* text feature two end */}

      {/* fancy banner start */}
      <FancyBanner />
      {/* fancy banner end */}

      {/* job portal intro start */}
      <JobPortalIntro />
      {/* job portal intro end */}

      {/* footer start */}
      <FooterOne />
      {/* footer end */}
    </Wrapper>
  );
}
