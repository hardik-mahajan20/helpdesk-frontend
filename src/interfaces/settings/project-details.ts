export interface ProjectDetailsRequestDTO {
  projectId: number;
  projectName: string;
  projectCode: string;
  projectURL: string;
  description: string;
  projectImage: string;
  enableNewChatNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSoundNotifications: boolean;
  directChatLink: string;
  ticketForwardingEmail: string;
  projectStatus: boolean;
  preChatFormEnabled: boolean;
}
