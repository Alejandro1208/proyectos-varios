/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Platform = 'Facebook' | 'Instagram' | 'TikTok' | 'X' | 'Meta' | 'Reddit';

export interface Thread {
  id: string;
  platform: Platform;
  postContext: string;
  myOriginalComment: string;
  latestReply: string;
  timestamp: string; 
  deepLink: string;
  isRead: boolean;
  replyCount?: number; // Nuevo opcional
}
