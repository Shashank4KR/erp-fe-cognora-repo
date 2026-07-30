export type CertificateResponse = {
  id: string;
  student_id: string;
  certificate_type: string;
  issued_date: string;
  valid_until?: string | null;
};

export type GenerateCertificatePayload = {
  student_id: string;
  certificate_type: string;
};