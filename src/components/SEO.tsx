import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "game";
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = "https://tamaweb.vercel.app/og-image.svg",
  url = "https://tamaweb.vercel.app/",
  type = "website",
  noIndex = false,
}) => {
  const { t, currentLanguage } = useTranslation();

  const defaultTitle = t("app.title");
  const defaultDescription = t("app.subtitle");
  const fullTitle = title
    ? `${title} | ${defaultTitle}`
    : `${defaultTitle} - Virtual Pet Game | Your Digital Companion`;
  const metaDescription = description || defaultDescription;
  const metaKeywords =
    keywords ||
    "virtual pet, tamagotchi, digital pet, pet game, browser game, virtual companion, pet simulator, online pet, retro game, nostalgic game";

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta description
    const metaDescriptionTag = document.querySelector(
      'meta[name="description"]'
    );
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute("content", metaDescription);
    }

    // Update meta keywords
    const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (metaKeywordsTag) {
      metaKeywordsTag.setAttribute("content", metaKeywords);
    }

    // Update robots meta
    const robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag) {
      robotsTag.setAttribute(
        "content",
        noIndex ? "noindex, nofollow" : "index, follow"
      );
    }

    // Update Open Graph tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", fullTitle);
    }

    const ogDescriptionTag = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute("content", metaDescription);
    }

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) {
      ogImageTag.setAttribute("content", image);
    }

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.setAttribute("content", url);
    }

    const ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag) {
      ogTypeTag.setAttribute("content", type);
    }

    // Update Twitter Card tags
    const twitterTitleTag = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute("content", fullTitle);
    }

    const twitterDescriptionTag = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDescriptionTag) {
      twitterDescriptionTag.setAttribute("content", metaDescription);
    }

    const twitterImageTag = document.querySelector(
      'meta[property="twitter:image"]'
    );
    if (twitterImageTag) {
      twitterImageTag.setAttribute("content", image);
    }

    const twitterUrlTag = document.querySelector(
      'meta[property="twitter:url"]'
    );
    if (twitterUrlTag) {
      twitterUrlTag.setAttribute("content", url);
    }

    // Update canonical URL
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute("href", url);
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update Open Graph locale
    const ogLocaleTag = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleTag) {
      const locale = currentLanguage === "es" ? "es_ES" : "en_US";
      ogLocaleTag.setAttribute("content", locale);
    }
  }, [
    fullTitle,
    metaDescription,
    metaKeywords,
    image,
    url,
    type,
    noIndex,
    currentLanguage,
  ]);

  return null;
};

export default SEO;
