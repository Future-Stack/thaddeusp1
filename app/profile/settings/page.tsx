"use client";

import React, { useState, useEffect } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import { motion } from 'framer-motion';
import { useGetUserSettings, useUpdateUserSettings } from '@/hooks/useSettings';
import { Loader2 } from 'lucide-react';

const Toggle = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (val: boolean) => void }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${enabled ? 'bg-[#F54900]' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        className={`${enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

const SettingItem = ({ title, description, enabled, setEnabled }: {
  title: string;
  description: string;
  enabled: boolean;
  setEnabled: (val: boolean) => void
}) => (
  <div className="flex items-center justify-between p-6 bg-white border border-gray-50 rounded-2xl hover:border-orange-100 transition-colors group">
    <div className="space-y-1">
      <h4 className="font-bold text-gray-900 group-hover:text-[#F54900] transition-colors">{title}</h4>
      <p className="text-sm text-gray-500 font-medium">{description}</p>
    </div>
    <Toggle enabled={enabled} setEnabled={setEnabled} />
  </div>
);

const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 mb-8">
    <h3 className="text-2xl font-bold mb-6 text-gray-900 px-2">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default function UserSettings() {
  const { data: userSettingsResponse, isLoading } = useGetUserSettings();
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateUserSettings();

  const [settings, setSettings] = useState({
    drawReminder: true,
    winnerAnnouncement: true,
    marketingEmails: false,
    weeklyDigest: true,
    voucherExpiryAlert: false,
    showOnWinnersList: true,
  });

  useEffect(() => {
    if (userSettingsResponse?.data) {
      setSettings({
        drawReminder: userSettingsResponse.data.drawReminder,
        winnerAnnouncement: userSettingsResponse.data.winnerAnnouncement,
        marketingEmails: userSettingsResponse.data.marketingEmails,
        weeklyDigest: userSettingsResponse.data.weeklyDigest,
        voucherExpiryAlert: userSettingsResponse.data.voucherExpiryAlert,
        showOnWinnersList: userSettingsResponse.data.showOnWinnersList,
      });
    }
  }, [userSettingsResponse]);

  const updateSetting = (key: keyof typeof settings) => (val: boolean) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    updateSettings(settings);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#F54900]" />
          <p className="text-gray-500 font-medium animate-pulse">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-inter selection:bg-orange-200 py-2 md:py-10">
      <div className="w-full px-4 md:px-6">

        {/* Header */}
        <AnimationWrapper animationType="fadeDown" className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Settings
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your account preferences and notifications</p>
        </AnimationWrapper>

        {/* Email Notifications */}
        <AnimationWrapper animationType="fadeUp" delay={0.1}>
          <SettingSection title="Email Notifications">
            <SettingItem
              title="Draw Reminder"
              description="Get notified 24 hours before each draw"
              enabled={settings.drawReminder}
              setEnabled={updateSetting('drawReminder')}
            />
            <SettingItem
              title="Winner Announcement"
              description="Be notified when winners are announced"
              enabled={settings.winnerAnnouncement}
              setEnabled={updateSetting('winnerAnnouncement')}
            />
            <SettingItem
              title="Marketing Emails"
              description="Receive promotional offers and updates"
              enabled={settings.marketingEmails}
              setEnabled={updateSetting('marketingEmails')}
            />
            <SettingItem
              title="Weekly Digest"
              description="Summary of your activity and upcoming draws"
              enabled={settings.weeklyDigest}
              setEnabled={updateSetting('weeklyDigest')}
            />
            <SettingItem
              title="Voucher Expiry Alert"
              description="Get notified before your vouchers expire"
              enabled={settings.voucherExpiryAlert}
              setEnabled={updateSetting('voucherExpiryAlert')}
            />
          </SettingSection>
        </AnimationWrapper>



        {/* Privacy */}
        <AnimationWrapper animationType="fadeUp" delay={0.3}>
          <SettingSection title="Privacy">
            <SettingItem
              title="Show on Winners List"
              description="Display your name when you win (first name + last initial)"
              enabled={settings.showOnWinnersList}
              setEnabled={updateSetting('showOnWinnersList')}
            />

          </SettingSection>
        </AnimationWrapper>

        {/* Action Buttons */}
        <AnimationWrapper animationType="fadeUp" delay={0.4} className="flex flex-col sm:flex-row items-center gap-4 mt-12 pb-10">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isUpdating}
            className="w-full sm:w-auto bg-[#F54900] text-white font-black px-10 py-5 rounded-2xl shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
            {isUpdating ? 'Saving...' : 'Save All Settings'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            disabled={isUpdating}
            className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold px-10 py-5 rounded-2xl hover:bg-gray-300 transition-all text-sm disabled:opacity-50"
          >
            Cancel
          </motion.button>
        </AnimationWrapper>

      </div>
    </div>
  );
}
