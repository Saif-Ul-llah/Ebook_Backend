export interface ManuscriptInput {
  customerId?: string;
  fullName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  projectTitle: string;
  genre: string;
  message?: string;
  fileKey?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  fileUrl?: string;
}
