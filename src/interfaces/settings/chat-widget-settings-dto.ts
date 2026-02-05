export interface ChatWidgetSettingsDto {
  chatWidgetId: number;
  headerTitle: string;
  welcomeMessage: string;
  chatPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  headerTextColor: string;
  headerBackground: string;
  agentTextColor: string;
  agentMessageBackground: string;
  customerTextColor: string;
  customerMessageBackground: string;
  enablePhoto: boolean;
  enableAttachment: boolean;
  enableEmoji: boolean;
  enableEditOption: boolean;
  enableDeleteOption: boolean;
}

export interface ChatWidgetProps {
  settings: ChatWidgetSettingsDto;
}
