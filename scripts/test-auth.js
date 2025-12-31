/**
 * Authentication API Test Script
 * Tests registration, login, and authentication flow
 */

const BASE_URL = 'http://localhost:3000';

async function testAuth() {
	console.log('🧪 Testing Authentication API...\n');

	try {
		// Test 1: Register new user
		console.log('1️⃣  Testing Registration...');
		const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: `test${Date.now()}@example.com`,
				password: 'TestPass123',
				fullName: 'Test User',
			}),
		});

		const registerData = await registerResponse.json();
		console.log('   Status:', registerResponse.status);
		console.log('   Success:', registerData.success);

		if (registerData.success) {
			console.log('   ✅ Registration successful');
			console.log('   User ID:', registerData.data.user.id);
			console.log('   Email:', registerData.data.user.email);
			console.log('   Role:', registerData.data.user.role);
		} else {
			console.log('   ❌ Registration failed:', registerData.error.message);
		}

		// Test 2: Login with test credentials
		console.log('\n2️⃣  Testing Login...');
		const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: 'user@protected-animals.vn',
				password: 'user123',
			}),
		});

		const loginData = await loginResponse.json();
		console.log('   Status:', loginResponse.status);
		console.log('   Success:', loginData.success);

		if (loginData.success) {
			console.log('   ✅ Login successful');
			console.log('   User:', loginData.data.user.email);
			console.log('   Role:', loginData.data.user.role);

			const accessToken = loginData.data.tokens.accessToken;

			// Test 3: Get current user
			console.log('\n3️⃣  Testing Get Current User...');
			const meResponse = await fetch(`${BASE_URL}/api/auth/me`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const meData = await meResponse.json();
			console.log('   Status:', meResponse.status);
			console.log('   Success:', meData.success);

			if (meData.success) {
				console.log('   ✅ Get user successful');
				console.log('   User:', meData.data.user.email);
				console.log('   Full Name:', meData.data.user.fullName);
			} else {
				console.log('   ❌ Get user failed:', meData.error.message);
			}

			// Test 4: Logout
			console.log('\n4️⃣  Testing Logout...');
			const logoutResponse = await fetch(`${BASE_URL}/api/auth/logout`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const logoutData = await logoutResponse.json();
			console.log('   Status:', logoutResponse.status);
			console.log('   Success:', logoutData.success);

			if (logoutData.success) {
				console.log('   ✅ Logout successful');
			} else {
				console.log('   ❌ Logout failed:', logoutData.error.message);
			}
		} else {
			console.log('   ❌ Login failed:', loginData.error.message);
		}

		// Test 5: Invalid credentials
		console.log('\n5️⃣  Testing Invalid Credentials...');
		const invalidLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: 'invalid@example.com',
				password: 'wrongpassword',
			}),
		});

		const invalidLoginData = await invalidLoginResponse.json();
		console.log('   Status:', invalidLoginResponse.status);
		console.log('   Success:', invalidLoginData.success);

		if (!invalidLoginData.success && invalidLoginResponse.status === 401) {
			console.log('   ✅ Invalid credentials properly rejected');
		} else {
			console.log('   ❌ Invalid credentials not properly handled');
		}

		console.log('\n✅ All authentication tests completed!');
		console.log('\n📝 Test Credentials:');
		console.log('   Admin:  admin@protected-animals.vn / admin123');
		console.log('   Expert: expert@protected-animals.vn / expert123');
		console.log('   User:   user@protected-animals.vn / user123');
	} catch (error) {
		console.error('\n❌ Test failed:', error.message);
		console.log('\n⚠️  Make sure the development server is running:');
		console.log('   npm run dev');
	}
}

testAuth();
