import {
  SiCredly,
  SiCoursera,
  SiUdemy,
  SiEdx,
  SiGoogle,
  SiCisco,
  SiLinkedin,
  SiAwsamplify,
  SiPluralsight,
} from "react-icons/si";
import { FaMicrosoft, FaAws, FaAmazon } from "react-icons/fa";
import { FaUniversity, FaMedal, FaCertificate } from "react-icons/fa";
import { IconType } from "react-icons";

export const certificationIconMap: Record<string, IconType> = {
  credly: SiCredly,
  acclaim: SiCredly,
  coursera: SiCoursera,
  udemy: SiUdemy,
  edx: SiEdx,
  google: SiGoogle,
  microsoft: FaMicrosoft,
  aws: FaAws,
  amazon: FaAmazon,
  awsamplify: SiAwsamplify,
  cisco: SiCisco,
  linkedin: SiLinkedin,
  pluralsight: SiPluralsight,

  // fallback common keywords
  university: FaUniversity,
  institute: FaUniversity,
  academy: FaUniversity,
  certificate: FaCertificate,
  cert: FaCertificate,
  badge: FaMedal,
};
