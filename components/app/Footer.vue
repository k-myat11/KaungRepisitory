<template>
    <footer class="bg-gray-400 h-24">
        <UContainer>
            <div class="flex h-10 space-x-4">
                <ULink as="button" @click="isProfileOpen = true">About Us</ULink>
                <ULink as="button" @click="isPrivacyOpen = true">Privacy</ULink>
                <ULink as="button">Policy</ULink>
                <ULink as="button">System Requirements</ULink>
                <ULink as="button">Contact</ULink>
            </div>
            <h1 class="text-white items-center justify-center">
                Copyright © 2025 Kaung Su Inc.
            </h1>
        </UContainer>

        <UModal v-model="isProfileOpen">
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">About Us</h2>
                </template>
                <div class="flex flex-col items-center">
                    <p>
                        Welcome to Kaung Su!<br><br>

                        At Kaung Su, we are dedicated to providing [your service or product] with the highest
                        quality and
                        customer satisfaction. Our mission is to [briefly describe your mission, e.g., “simplify
                        technology for
                        businesses” or “help people live healthier lives”].<br><br>
                        Who We Are<br><br>
                        Founded in 2025, we have grown into a trusted name in software development. <br><br>
                        Why Choose Us?<br><br>
                        ✅ Expertise: Years of experience in [your industry]<br>
                        ✅ Innovation: Cutting-edge solutions that drive results<br>
                        ✅ Quality: Commitment to excellence and reliability<br><br>
                        Contact Us<br><br>

                        📍 Location: Hladaw Village,Wetlet Township,Sagaing Division.<br>
                        📧 Email: kaungsu@gmail.com<br>
                        📞 Phone: 080-6376-5828<br>
                        🌍 Website: www.kaungsu.com
                    </p>
                </div>
                <template #footer>
                    <UButton color="gray" block @click="isProfileOpen = false">Close</UButton>
                </template>
            </UCard>
        </UModal>

        <UModal v-model="isPrivacyOpen">
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">Pravicy</h2>
                </template>
                <p><strong>Privacy Policy</strong></p>

                <p><strong>Effective Date:</strong> [Insert Date]</p>

                <p>At <strong>[Your Company Name]</strong>, we value your privacy and are committed to protecting your
                    personal
                    information. This Privacy Policy explains how we collect, use, and safeguard your information when
                    you use
                    our services.</p>

                <p><strong>1. Information We Collect</strong></p>
                <p>We may collect the following types of information:</p>
                <p><strong>Personal Information:</strong> This includes your name, email address, phone number, and any
                    other
                    details you provide to us during registration or use of our services.<br>
                    <strong>Usage Data:</strong> Information about how you interact with our website, such as IP
                    addresses,
                    browser type, device type, and pages visited.<br>
                    <strong>Cookies:</strong> We use cookies to enhance your experience on our website and to track
                    website
                    activity.
                </p>

                <p><strong>2. How We Use Your Information</strong></p>
                <p>We use the collected data for the following purposes:</p>
                <p>To provide and improve our services.<br>
                    To communicate with you, including sending newsletters or marketing materials.<br>
                    To personalize your experience on our website.<br>
                    To comply with legal obligations and resolve disputes.</p>

                <p><strong>3. Data Security</strong></p>
                <p>We implement industry-standard security measures to protect your personal information from
                    unauthorized
                    access, alteration, or destruction. However, no method of transmission over the internet is
                    completely
                    secure, and we cannot guarantee absolute security.</p>

                <p><strong>4. Sharing Your Information</strong></p>
                <p>We may share your information with third parties under the following circumstances:</p>
                <p><strong>Service Providers:</strong> We may share data with trusted third-party service providers who
                    help us
                    operate our services.<br>
                    <strong>Legal Requirements:</strong> If required by law, we may disclose your information in
                    response to
                    legal proceedings or governmental requests.
                </p>

                <p><strong>5. Your Choices</strong></p>
                <p><strong>Access and Update:</strong> You can access, update, or correct your personal information by
                    logging
                    into your account or contacting us.<br>
                    <strong>Opt-Out:</strong> You can opt-out of receiving marketing emails by clicking the unsubscribe
                    link in
                    the email.
                </p>

                <p><strong>6. Changes to This Privacy Policy</strong></p>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the
                    updated
                    effective date.</p>

                <p><strong>7. Contact Us</strong></p>
                <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
                <p><strong>Email:</strong> [Your Email]<br>
                    <strong>Phone:</strong> [Your Contact Number]<br>
                    <strong>Website:</strong> [Your Website URL]
                </p>
                <template #footer>
                    <UButton color="gray" block @click="isPrivacyOpen = false">Close</UButton>
                </template>
            </UCard>
        </UModal>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Control profile modal visibility
const isProfileOpen = ref(false);
const isPrivacyOpen = ref(false);
</script>