'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../i18n/client';
import { FaUser, FaBell, FaLock, FaShieldAlt, FaStar, FaQuestionCircle, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';

const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' }
];

export default function SettingsPage({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const { t, i18n } = useTranslation(lng);
  const [user, setUser] = useState<any>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    photoURL: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    allowMessages: true,
    twoFactorAuth: false
  });
  const [contentPreferences, setContentPreferences] = useState({
    favoriteDomains: [] as string[],
    personalizedRecommendations: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setProfileData({
          displayName: user.displayName || '',
          photoURL: user.photoURL || ''
        });
        // Load saved languages
        const savedLanguages = localStorage.getItem('selectedLanguages');
        if (savedLanguages) {
          setSelectedLanguages(JSON.parse(savedLanguages));
        }
      } else {
        router.push('/register');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    // Save selected languages to localStorage
    localStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));
    
    // Update the primary language if it's not in the selected languages
    if (!selectedLanguages.includes(lng)) {
      i18n.changeLanguage(selectedLanguages[0] || lng);
      document.documentElement.lang = selectedLanguages[0] || lng;
      document.documentElement.dir = selectedLanguages[0] === 'ar' ? 'rtl' : 'ltr';
    }
  }, [selectedLanguages, lng, i18n]);

  const handleProfileUpdate = async () => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: profileData.displayName,
          photoURL: profileData.photoURL
        });
        toast.success(t('settings.profileUpdated'));
        setIsEditingProfile(false);
      }
    } catch (error) {
      toast.error(t('settings.updateError'));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/register');
    } catch (error) {
      toast.error(t('settings.logoutError'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('settings.confirmDelete'))) {
      try {
        await user.delete();
        router.push('/register');
      } catch (error) {
        toast.error(t('settings.deleteError'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-white to-[#f0f9ff] p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">
            {t('settings.title')}
        </h1>
          </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaUser className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.profile')}</h2>
            </div>
            {isEditingProfile ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  placeholder={t('settings.name')}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={profileData.photoURL}
                  onChange={(e) => setProfileData({ ...profileData, photoURL: e.target.value })}
                  placeholder={t('settings.photoURL')}
                  className="w-full p-2 border rounded-lg"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleProfileUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    {t('settings.save')}
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    {t('settings.cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p><strong>{t('settings.name')}:</strong> {user?.displayName || t('settings.notSet')}</p>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {t('settings.editProfile')}
                </button>
              </div>
            )}
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaBell className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.notifications')}</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="mr-2"
                />
                {t('settings.emailNotifications')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="mr-2"
                />
                {t('settings.pushNotifications')}
              </label>
          </div>
          </section>

          {/* Privacy Section */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaLock className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.privacy')}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">{t('settings.profileVisibility')}</label>
            <select
                  value={privacy.profileVisibility}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="public">{t('settings.public')}</option>
                  <option value="private">{t('settings.private')}</option>
            </select>
          </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={privacy.allowMessages}
                  onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                  className="mr-2"
                />
                {t('settings.allowMessages')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={privacy.twoFactorAuth}
                  onChange={(e) => setPrivacy({ ...privacy, twoFactorAuth: e.target.checked })}
                  className="mr-2"
                />
                {t('settings.twoFactorAuth')}
              </label>
            </div>
          </section>

          {/* Content Preferences */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaStar className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.contentPreferences')}</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={contentPreferences.personalizedRecommendations}
                  onChange={(e) => setContentPreferences({
                    ...contentPreferences,
                    personalizedRecommendations: e.target.checked
                  })}
                  className="mr-2"
                />
                {t('settings.personalizedRecommendations')}
              </label>
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaQuestionCircle className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.support')}</h2>
            </div>
            <div className="space-y-4">
              <a href="/faq" className="text-blue-600 hover:text-blue-800 block">
                {t('settings.faq')}
              </a>
              <a href="/contact" className="text-blue-600 hover:text-blue-800 block">
                {t('settings.contactSupport')}
              </a>
              <a href="/feedback" className="text-blue-600 hover:text-blue-800 block">
                {t('settings.sendFeedback')}
              </a>
            </div>
          </section>

          {/* Account Management */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{t('settings.account')}</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 block"
              >
                {t('settings.logout')}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 hover:text-red-800 block flex items-center"
              >
                <FaTrash className="mr-2" />
                {t('settings.deleteAccount')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
