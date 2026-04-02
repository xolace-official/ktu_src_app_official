SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict khEdZC35wV4hSRJS4zxHZEzUZX8zWVNlY5mPyXLsv9dRkbUKw9ZHQyE6NG97zdr

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '12a18dee-d217-4b18-8f7b-bc957bccec8b', '{"action":"user_signedup","actor_id":"7f4b15ae-a264-4b8b-9e09-85c034d4b0e5","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-13 17:01:39.464801+00', ''),
	('00000000-0000-0000-0000-000000000000', '0461193b-3f06-4dea-a294-0b5ae03f041e', '{"action":"login","actor_id":"7f4b15ae-a264-4b8b-9e09-85c034d4b0e5","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-11-13 17:01:39.477595+00', ''),
	('00000000-0000-0000-0000-000000000000', '95d4f4d2-666a-49e6-940f-0b8e4da1ea11', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"7f4b15ae-a264-4b8b-9e09-85c034d4b0e5","user_phone":""}}', '2025-11-13 17:04:11.210725+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee8e1be0-8bf0-4c5d-bddb-b5423c54b2dc', '{"action":"user_signedup","actor_id":"c8b3d43c-3a19-443a-a080-bdc9b5c11399","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-13 17:04:56.113642+00', ''),
	('00000000-0000-0000-0000-000000000000', '43ed695b-acad-434b-9f35-17f478170eae', '{"action":"login","actor_id":"c8b3d43c-3a19-443a-a080-bdc9b5c11399","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-11-13 17:04:56.120718+00', ''),
	('00000000-0000-0000-0000-000000000000', '114c89aa-cc66-4b69-b277-2e48b4cfe8fc', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"c8b3d43c-3a19-443a-a080-bdc9b5c11399","user_phone":""}}', '2025-11-13 17:05:31.526925+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cca03cfa-6c93-4cc0-b96e-3f60f498dd76', '{"action":"user_confirmation_requested","actor_id":"c7bc6ea9-8648-4b4b-950b-7cae3ae78199","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-13 17:09:34.060514+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4685d9a-e037-486b-8b75-62ab99e3e993', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"c7bc6ea9-8648-4b4b-950b-7cae3ae78199","user_phone":""}}', '2025-11-13 17:11:43.55441+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fb857c6-600d-4d60-97b8-90dd359af0e8', '{"action":"user_confirmation_requested","actor_id":"c3e717f0-ffbc-4304-afef-bfe5cc09fdbd","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-13 17:12:25.494534+00', ''),
	('00000000-0000-0000-0000-000000000000', '885d36df-187f-4856-b9a3-7fa8adbc498f', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"c3e717f0-ffbc-4304-afef-bfe5cc09fdbd","user_phone":""}}', '2025-11-13 17:13:03.11575+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2237729-1419-4cd8-a2db-e6ec96b88f57', '{"action":"user_confirmation_requested","actor_id":"8e09c479-1289-499e-b53d-637181f50fd9","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-13 17:14:43.287687+00', ''),
	('00000000-0000-0000-0000-000000000000', '28375f6b-47c4-4830-a08e-e5e5093053e8', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"8e09c479-1289-499e-b53d-637181f50fd9","user_phone":""}}', '2025-11-14 15:47:50.865868+00', ''),
	('00000000-0000-0000-0000-000000000000', '9850aef2-2ae8-4e5e-a89d-199d1cec647f', '{"action":"user_confirmation_requested","actor_id":"67084aa4-9f39-4322-9e04-8319ddeaef89","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 15:48:41.208952+00', ''),
	('00000000-0000-0000-0000-000000000000', '880b5292-d493-4d58-a9a1-c5d21d5cc556', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"67084aa4-9f39-4322-9e04-8319ddeaef89","user_phone":""}}', '2025-11-14 15:56:15.204278+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a737ed5-dc9e-4553-995c-e114477b932f', '{"action":"user_confirmation_requested","actor_id":"22ac559f-7941-454d-ae81-837476d3ab93","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 16:01:02.179429+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a25230ad-9204-4281-b9dc-ccd155afe9eb', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"22ac559f-7941-454d-ae81-837476d3ab93","user_phone":""}}', '2025-11-14 16:01:51.065274+00', ''),
	('00000000-0000-0000-0000-000000000000', '709f4c7e-9d02-43b5-b98c-ad944c7e8824', '{"action":"user_confirmation_requested","actor_id":"b91c4d72-a609-438e-86ba-2f1415c77725","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 16:11:04.648869+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc36570d-3ae6-405b-9d91-e909cb05f162', '{"action":"user_signedup","actor_id":"b91c4d72-a609-438e-86ba-2f1415c77725","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-14 16:11:55.892162+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be0b0215-241a-42f3-a14b-bdbcae7917a7', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"b91c4d72-a609-438e-86ba-2f1415c77725","user_phone":""}}', '2025-11-14 16:30:45.833743+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f424df87-2172-4100-b580-0ddea5e15056', '{"action":"user_confirmation_requested","actor_id":"8b91f9bc-ad53-43bb-9d04-cb090c86b4a0","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 16:33:26.643437+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c4239cc-ca4e-4631-8922-95b957cf084e', '{"action":"user_signedup","actor_id":"8b91f9bc-ad53-43bb-9d04-cb090c86b4a0","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-14 16:33:57.104769+00', ''),
	('00000000-0000-0000-0000-000000000000', '35aa9111-a845-4c7e-909a-4275df6f4d97', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"8b91f9bc-ad53-43bb-9d04-cb090c86b4a0","user_phone":""}}', '2025-11-14 16:38:47.168544+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e47cf108-8e2a-4ff1-8ff0-51ed973810a1', '{"action":"user_confirmation_requested","actor_id":"bdaa81e7-ec3f-435d-8335-67ecba16a98d","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 16:39:43.15999+00', ''),
	('00000000-0000-0000-0000-000000000000', '18b98756-1e90-484e-be7d-ad0c71b4aa33', '{"action":"user_signedup","actor_id":"bdaa81e7-ec3f-435d-8335-67ecba16a98d","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-14 16:41:11.719552+00', ''),
	('00000000-0000-0000-0000-000000000000', '7988fc58-3da7-455b-b94e-14435f81501d', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"bdaa81e7-ec3f-435d-8335-67ecba16a98d","user_phone":""}}', '2025-11-14 16:51:31.068662+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a00ca422-f29a-4e96-aa3f-b6ab862ece63', '{"action":"user_confirmation_requested","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 16:52:33.226834+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b4568c2-67e9-4acd-a182-24e702d21dd3', '{"action":"user_signedup","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-14 16:52:55.668377+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c125df36-b285-4455-acbc-6115598bc55e', '{"action":"user_confirmation_requested","actor_id":"be5d5ef5-a155-4df0-bd59-8f1ae3bcf9bd","actor_username":"tester1@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 17:09:16.69978+00', ''),
	('00000000-0000-0000-0000-000000000000', '9301ba4c-043f-42f3-b4ca-451e427c1266', '{"action":"user_confirmation_requested","actor_id":"be5d5ef5-a155-4df0-bd59-8f1ae3bcf9bd","actor_username":"tester1@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-14 17:12:38.75772+00', ''),
	('00000000-0000-0000-0000-000000000000', '94eb5aef-a553-4fca-a946-40c2ec5a13d2', '{"action":"user_signedup","actor_id":"be5d5ef5-a155-4df0-bd59-8f1ae3bcf9bd","actor_username":"tester1@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-14 17:13:05.030169+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4fe2cf3-b94b-481d-a243-aa6cddd9a318', '{"action":"token_refreshed","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 17:51:00.451724+00', ''),
	('00000000-0000-0000-0000-000000000000', '05c0c217-1823-4c49-a65f-34fd0de3367f', '{"action":"token_revoked","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 17:51:00.455588+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf8bf6b6-fbe4-4036-9972-ccd072f89064', '{"action":"token_refreshed","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 18:49:00.85376+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a13a45bd-76d7-47b8-b20b-48835b5631dc', '{"action":"token_revoked","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 18:49:00.855254+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c52802a-88db-4c5a-849a-c6d642637c07', '{"action":"token_refreshed","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 19:47:01.160554+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a32732e-593c-4dc7-99fc-96aed87f4416', '{"action":"token_revoked","actor_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-14 19:47:01.161501+00', ''),
	('00000000-0000-0000-0000-000000000000', '1340bfd4-dcc3-43a6-aa57-6a204a95e301', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester1@example.com","user_id":"be5d5ef5-a155-4df0-bd59-8f1ae3bcf9bd","user_phone":""}}', '2025-11-15 00:51:42.879735+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bfbb20e-ade0-4105-ab1d-48fe74dccf48', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester@example.com","user_id":"3073af52-e8d1-45f1-932c-8fb997627ce3","user_phone":""}}', '2025-11-15 00:51:42.878358+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bb09ca5-1bd6-464e-8ddb-77eb1ff31699', '{"action":"user_confirmation_requested","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-11-15 00:53:22.032449+00', ''),
	('00000000-0000-0000-0000-000000000000', '822d53f4-9d2a-46d8-8cf2-7d963b083a60', '{"action":"user_signedup","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-11-15 00:53:49.045908+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffaf4640-3341-4e6c-a42f-af10efd5e6c2', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 16:21:43.232742+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e17910dc-ef7c-4aff-aaf0-7d652ca12c63', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 16:21:43.241399+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f76fd4a-f987-42e1-bc3e-38027fd94083', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-11-17 17:14:01.069643+00', ''),
	('00000000-0000-0000-0000-000000000000', '08e76ec4-ee09-415c-9f76-941a6cbe6752', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 17:20:10.127653+00', ''),
	('00000000-0000-0000-0000-000000000000', '663a2642-7e2f-4811-bb0a-5202485ebd4b', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 17:20:10.129341+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c42f41f7-d2e6-4b63-a1f4-ac2227058844', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 18:18:10.826202+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f148dad6-4070-47fe-aa96-54a1c51209c0', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 18:18:10.834529+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba3a665d-dbd4-4081-b5f4-6d5da60e9025', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 19:16:11.229676+00', ''),
	('00000000-0000-0000-0000-000000000000', '8130589b-a73d-4e92-a223-71b91a22a88e', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-17 19:16:11.235421+00', ''),
	('00000000-0000-0000-0000-000000000000', '57f9c005-f51b-4434-bb29-9fda08138348', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 03:04:26.267389+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f91bc69f-5c2f-4b20-a127-2a7b66ab5597', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 03:04:26.501543+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fea6ad9-2573-4497-a3a1-59b2a395d4c5', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 04:02:34.435539+00', ''),
	('00000000-0000-0000-0000-000000000000', '17da02b4-ad0c-46ff-ba33-a003aeb7ecf7', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 04:02:34.443629+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd48e3b2c-0c4d-427a-ae9d-3b98a17a836a', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 05:00:40.047536+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3e89bdf-4933-4672-9029-18c6bca5bdc3', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 05:00:40.078132+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac1ffd21-dd47-4920-9709-b91545d2f8d8', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 05:28:11.073108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f749a771-3d71-4454-a5b5-381380624de1', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 05:28:11.081628+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e83cd76-1f73-4c20-ac57-4d56502d5653', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 09:33:26.86058+00', ''),
	('00000000-0000-0000-0000-000000000000', '89757395-e51e-49eb-b333-51369e82c45a', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 09:33:26.870202+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b3a0a8e-3574-4c2a-80de-649cab82b10d', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 12:06:14.624778+00', ''),
	('00000000-0000-0000-0000-000000000000', '6393d92a-522c-4698-8b59-086dfef929b9', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-18 12:06:14.709834+00', ''),
	('00000000-0000-0000-0000-000000000000', 'abcfbe28-fcec-4c44-bb50-d00fc73bf499', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 13:30:32.656831+00', ''),
	('00000000-0000-0000-0000-000000000000', '1cdcc043-cfee-4d5b-813b-4f898fe5b5c8', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 13:30:32.66738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdcfa16c-e6cf-42f7-bb1f-504a6041855f', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 14:28:50.566416+00', ''),
	('00000000-0000-0000-0000-000000000000', '67129c7a-e7eb-496e-9e89-1db3361848de', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 14:28:50.571433+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f70a939f-832c-4f48-a38b-dd4bc6eb3d19', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 15:26:51.474611+00', ''),
	('00000000-0000-0000-0000-000000000000', '64bc1147-78ff-4e9c-b123-c9e6005d4895', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 15:26:51.480981+00', ''),
	('00000000-0000-0000-0000-000000000000', '389589e7-ec55-4ebf-97ff-3317b4db1d76', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 16:24:52.462732+00', ''),
	('00000000-0000-0000-0000-000000000000', '04d6b0b3-9dd8-4d75-8c07-6c175171bddd', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 16:24:52.470115+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d2b8936-3420-4993-8032-6c644ea811c0', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 17:22:52.548823+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df51376f-d95e-42f2-a353-b594f57c7c26', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 17:22:52.552323+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d50e0e1-3392-4d14-82f7-0ce89dddf7f8', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 18:20:53.419803+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa2b9cb8-0844-4544-b4c8-1acfdac3569e', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 18:20:53.42637+00', ''),
	('00000000-0000-0000-0000-000000000000', '887a6126-935e-408c-b5c8-ee3e2bedd861', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 19:42:46.670995+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc449461-9652-4ec1-8e8d-f49685bbac9f', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 19:42:46.67588+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b3f39bd-0560-4685-a5f0-0d286e21f1ef', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 20:40:54.715365+00', ''),
	('00000000-0000-0000-0000-000000000000', '32588a7c-73ca-4659-9ee6-484fa23eb41b', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 20:40:54.718685+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ead07171-4fcc-46eb-b7af-1e28c2226a46', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 21:38:54.9465+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fd7b94a-38e2-46ec-903b-a7e29a8de35e', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 21:38:54.954533+00', ''),
	('00000000-0000-0000-0000-000000000000', '6efc8b4f-6a91-46c9-8249-e9b84acbc47c', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 22:36:55.407185+00', ''),
	('00000000-0000-0000-0000-000000000000', '60e3b207-8c2b-42b2-8506-f1dff0e0625d', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 22:36:55.430031+00', ''),
	('00000000-0000-0000-0000-000000000000', '80b23832-0ed6-4dc6-af50-253972e964de', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 23:34:56.3302+00', ''),
	('00000000-0000-0000-0000-000000000000', '88edea47-1145-4636-ba1b-980e70810a17', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-20 23:34:56.336596+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a4f0038-efd7-4394-80d8-bd789fb58797', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-21 08:22:46.986689+00', ''),
	('00000000-0000-0000-0000-000000000000', '3201a15d-0010-45d1-9722-a52d6b4c793a', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-21 08:22:47.010663+00', ''),
	('00000000-0000-0000-0000-000000000000', '19415a15-987d-4fab-819d-abea8e9125b6', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-21 09:21:02.340385+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2873221-43c8-471b-aa64-c6d70a6e613a', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-21 09:21:02.347527+00', ''),
	('00000000-0000-0000-0000-000000000000', '5548f37d-9773-464f-a9d8-94562e1b6fcb', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 05:08:56.471713+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb973381-70c0-4c06-8689-582959a26154', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 05:08:56.484568+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fb8312d-0801-4dc9-b8f1-65acaf7e2981', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 06:06:57.14396+00', ''),
	('00000000-0000-0000-0000-000000000000', '7209ac83-07ff-4b8c-acf7-b62428e7f5aa', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 06:06:57.145009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efb6b555-f118-46f2-8cf4-9908021e05ef', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 07:04:57.598683+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac71afea-6d3d-4514-acf6-2b139e60cc93', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 07:04:57.600179+00', ''),
	('00000000-0000-0000-0000-000000000000', '4eea6e20-1a98-4f19-8bf2-f3d211a268be', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 08:11:02.243434+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efe66350-b31b-416e-b17a-44045b9e9c87', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 08:11:02.252072+00', ''),
	('00000000-0000-0000-0000-000000000000', '40b818de-f2a5-478a-896a-ad08e76d07f2', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 09:09:17.742716+00', ''),
	('00000000-0000-0000-0000-000000000000', '65a25d5c-9c1a-45a7-bd33-dc2fdae69a59', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 09:09:17.74607+00', ''),
	('00000000-0000-0000-0000-000000000000', '72b5f879-7b38-4836-a0b0-adcbe3b72263', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 10:07:18.314644+00', ''),
	('00000000-0000-0000-0000-000000000000', '746cb37d-2855-4904-af18-58c1d631e135', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 10:07:18.316772+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c247399-c82a-40ff-9fb9-04d0c544ab16', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 11:05:18.811747+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c6cb3a5-97a3-4e9b-8da8-4f2a5e5a80c7', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 11:05:18.813663+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a64475fa-b8b7-4d36-bcfe-5be839a1b143', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 12:03:19.198564+00', ''),
	('00000000-0000-0000-0000-000000000000', '11fc64c5-9611-4518-b056-4a413590f0e1', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 12:03:19.201667+00', ''),
	('00000000-0000-0000-0000-000000000000', '4033279d-bd6d-4754-a5fe-57d115ed3fdf', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 16:15:06.881373+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b653d235-fdea-4f17-8004-194d89c0707b', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-26 16:15:06.884413+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b068c95b-0614-4120-b1ab-22a80342a962', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 20:57:25.88106+00', ''),
	('00000000-0000-0000-0000-000000000000', '44b9dad8-9795-4bc8-b630-067289c7e678', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 20:57:25.891394+00', ''),
	('00000000-0000-0000-0000-000000000000', '82f3c4c0-5bbc-4d2b-8835-3e9e11e63837', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 21:55:27.918169+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2f2ff69-3179-4425-b3de-64cb1500d354', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 21:55:27.918948+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ada4ad05-f2f2-4038-b734-7d86a433e6a2', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 22:53:41.440505+00', ''),
	('00000000-0000-0000-0000-000000000000', '03e78995-e0e0-4215-9829-eddd03c3ea80', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-11-27 22:53:41.441116+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f545f05-e79e-4b9a-b5cc-e92d69ddaa51', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-03 22:10:08.716916+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb70588d-9e7b-43e1-929a-f13813969a8d', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-04 00:05:49.160418+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9a54f31-45c5-402f-b9b8-f1a5451c2aff', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-04 05:11:06.246587+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b8b7f73-8820-4acc-8a3c-19d2da70bfe7', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-04 06:11:05.126413+00', ''),
	('00000000-0000-0000-0000-000000000000', '52071bf5-c992-49ff-9e18-15ab6e12882b', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-11 14:33:20.254397+00', ''),
	('00000000-0000-0000-0000-000000000000', '0da14e79-5003-4378-864a-9e71cb8f9754', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 15:31:32.883322+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a34b509-0f67-4eb3-81b4-35e2defa7366', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 15:31:32.886179+00', ''),
	('00000000-0000-0000-0000-000000000000', '1003c841-7b01-4f50-bad0-a3a93946d22f', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-11 16:26:32.735196+00', ''),
	('00000000-0000-0000-0000-000000000000', '87b3ec36-a3ff-49d2-a86a-fe1cbb575c93', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 17:24:48.926229+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c762138e-89c8-43c5-8fc1-9cbfddd6ea38', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 17:24:48.930217+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af58032c-d9a5-407e-8a11-8ca2651f6c48', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 18:23:07.251362+00', ''),
	('00000000-0000-0000-0000-000000000000', '36f51268-fc71-4764-864e-871dad3290e6', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 18:23:07.255987+00', ''),
	('00000000-0000-0000-0000-000000000000', '8fd581b7-fd81-42ee-b5d2-a22e4a41829a', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 21:04:12.47405+00', ''),
	('00000000-0000-0000-0000-000000000000', '05cbc1e5-07af-4830-9955-fa8e651990c5', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 21:04:12.586444+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2b78afc-e2b7-4be7-8cc2-a579170324a0', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 22:02:35.102428+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbcec941-a5bb-4eb9-89af-4a8a806080da', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2025-12-11 22:02:35.106281+00', ''),
	('00000000-0000-0000-0000-000000000000', '184f01d0-9086-4339-9708-d80268555ec5', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-13 11:43:00.550335+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6831809-97ef-4718-b415-59bec93dd224', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-01-13 12:13:08.272222+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b1b3c0e-5fce-4207-a78c-d753a0db2d98', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-13 12:32:54.692797+00', ''),
	('00000000-0000-0000-0000-000000000000', '9eff484c-17d2-4b26-8893-f34dd7635d02', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-01-13 12:46:17.381976+00', ''),
	('00000000-0000-0000-0000-000000000000', '8de4a6ba-d48d-4712-90a5-c21fe9e0eea9', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-13 12:47:34.541625+00', ''),
	('00000000-0000-0000-0000-000000000000', '0984ad70-fd85-4910-9820-319acdb6c248', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-13 12:47:37.32624+00', ''),
	('00000000-0000-0000-0000-000000000000', '15aba7bd-dc1b-45cb-aa7d-f5a5981ef2ad', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-13 12:47:53.208586+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9782f83-5cbe-4066-af77-02c9136b9878', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-24 16:12:52.064827+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4491ad9-123b-4f6a-8e5a-41afbdbd1f60', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-01-24 16:15:47.803252+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aefd4779-54ee-4dd4-bf8e-f3068b44de28', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-24 16:16:07.377478+00', ''),
	('00000000-0000-0000-0000-000000000000', '29ccf78d-9fcb-4c87-82d1-12fcd6af30ff', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-01-25 11:14:44.161227+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfb6e7d0-657b-4eb2-aeb1-a83d4ff35cb4', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-10 09:57:51.764331+00', ''),
	('00000000-0000-0000-0000-000000000000', '26e626c9-5fb8-4489-bf86-a564a49a8eac', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-10 10:03:05.857882+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd84134d8-53ca-43c1-91eb-d03e92980e71', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-10 10:10:02.925987+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9aac6a4-fad9-41b1-af6f-c7dff15ddfa0', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-10 10:13:02.424902+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ae506c3-254e-4d1f-9135-e8fae523871c', '{"action":"user_confirmation_requested","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:13:45.50644+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b913534-9890-4cc9-badf-ea3e0e39f0fb', '{"action":"user_signedup","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-10 10:14:30.851051+00', ''),
	('00000000-0000-0000-0000-000000000000', '585bdec4-ca1d-4e9c-bbd8-0e95ec1e01cb', '{"action":"user_recovery_requested","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-10 10:16:15.316942+00', ''),
	('00000000-0000-0000-0000-000000000000', '5117d114-e33a-44b7-82c4-e6d20823b45f', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-10 10:16:34.028641+00', ''),
	('00000000-0000-0000-0000-000000000000', '33ee26f5-c448-44f0-96c6-7e08cc1a1c36', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-10 10:39:47.706199+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e06ef870-00e6-4280-b761-5290694992bd', '{"action":"user_repeated_signup","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:45:30.984004+00', ''),
	('00000000-0000-0000-0000-000000000000', '170a3da2-040c-440e-a414-9b5e1cf78702', '{"action":"user_repeated_signup","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:45:32.745806+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d334b80-fbaa-4a24-a382-ad99360163ba', '{"action":"user_repeated_signup","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:54:35.717268+00', ''),
	('00000000-0000-0000-0000-000000000000', '991158d3-3495-4cfe-807e-1f2f11dff064', '{"action":"user_repeated_signup","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:54:43.558699+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd668dbdd-fd64-4ab0-a3a9-3d4a52ead5d1', '{"action":"user_repeated_signup","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:55:04.369631+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4b2d64c-1480-41bb-b1f8-61d436148a27', '{"action":"user_confirmation_requested","actor_id":"a585c9c1-66ea-4d82-9d5e-b468c255b507","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 10:58:04.885264+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b4fab5d-78d5-479d-bbe9-51d879b6cd06', '{"action":"user_signedup","actor_id":"a585c9c1-66ea-4d82-9d5e-b468c255b507","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-10 10:58:39.223957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4459a1b-21c4-4d3c-8702-99bb3f4df842', '{"action":"logout","actor_id":"a585c9c1-66ea-4d82-9d5e-b468c255b507","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-10 11:07:19.242278+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ecbc342-2301-4273-bc06-6bb1ce815c2f', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester2@ktu.edu.gh","user_id":"a585c9c1-66ea-4d82-9d5e-b468c255b507","user_phone":""}}', '2026-02-10 11:21:01.042666+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5d029ab-f8d0-4060-ab33-94a1bb1ac206', '{"action":"user_confirmation_requested","actor_id":"e9d16c9a-d761-42cb-b4b2-055ccafb330c","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 11:21:55.527528+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f078307-0af7-4434-b366-464c51748b49', '{"action":"user_confirmation_requested","actor_id":"e9d16c9a-d761-42cb-b4b2-055ccafb330c","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-10 11:25:14.056977+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee25238e-230e-4e12-926d-bd386cd9e8ed', '{"action":"user_signedup","actor_id":"e9d16c9a-d761-42cb-b4b2-055ccafb330c","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-10 11:28:03.051101+00', ''),
	('00000000-0000-0000-0000-000000000000', '273eb6ba-0eb7-4648-ae16-95c8803688f2', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester2@ktu.edu.gh","user_id":"e9d16c9a-d761-42cb-b4b2-055ccafb330c","user_phone":""}}', '2026-02-10 11:35:49.775467+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4248482-adca-4a85-812d-dde23a837eb2', '{"action":"user_confirmation_requested","actor_id":"8f9936fc-e0db-48f5-a04b-b66396c9b341","actor_username":"kvngnathan8420@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-10 12:18:09.107967+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d288662-070e-4d77-8b98-1f9b815f2ede', '{"action":"user_signedup","actor_id":"8f9936fc-e0db-48f5-a04b-b66396c9b341","actor_username":"kvngnathan8420@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-10 12:18:33.815691+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db6373e8-4e9f-458b-b269-28e72559de2e', '{"action":"user_confirmation_requested","actor_id":"ca04ac35-df83-4bf1-ad2b-c20578d4b364","actor_username":"tester3@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-13 23:27:09.376149+00', ''),
	('00000000-0000-0000-0000-000000000000', '979df5e3-2ee2-4bd7-9b8b-70df87aab65c', '{"action":"user_signedup","actor_id":"ca04ac35-df83-4bf1-ad2b-c20578d4b364","actor_username":"tester3@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-13 23:27:38.411844+00', ''),
	('00000000-0000-0000-0000-000000000000', '17fe14c5-d8fb-4400-883a-4c246e89ca0f', '{"action":"logout","actor_id":"ca04ac35-df83-4bf1-ad2b-c20578d4b364","actor_username":"tester3@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-13 23:30:18.641402+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b19eee6-f859-4bc9-b17c-003cbbd3a41a', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-18 17:05:32.653239+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9cf9cd3-3765-4f82-be4f-805987178955', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 18:03:33.534308+00', ''),
	('00000000-0000-0000-0000-000000000000', '493e2417-b934-4f2b-b2fa-5ab8c09694e7', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 18:03:33.535308+00', ''),
	('00000000-0000-0000-0000-000000000000', '011344a6-ac3a-4ecd-bdbd-e2d21c60667f', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 19:01:58.39056+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc8d2119-9847-49c0-bdb8-ff953e36d24f', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 19:01:58.39237+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a08fb9c7-1334-4f62-8d24-3ad306f16009', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 19:59:58.662324+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e428042f-62ea-4b8f-95a7-bbfbe2e93566', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 19:59:58.663448+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0eb2d6d-234d-4873-9242-1a4cceeb9608', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 21:05:24.707022+00', ''),
	('00000000-0000-0000-0000-000000000000', '65d99922-f384-481d-9052-ec0e80f43b1c', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 21:05:24.708263+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6054826-92b2-4f28-99d7-778671f9db6e', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-18 21:59:24.083559+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a51656a3-f30e-4447-a17d-8449bc5ee338', '{"action":"user_confirmation_requested","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-18 22:00:21.032507+00', ''),
	('00000000-0000-0000-0000-000000000000', '5294bb4a-613b-48cb-91ef-316d97348fdd', '{"action":"user_signedup","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-18 22:00:38.146745+00', ''),
	('00000000-0000-0000-0000-000000000000', '51f82b2e-4431-4491-8e0d-40fb63d969cc', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 22:58:46.642315+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd0d7a27-0932-4a88-88ef-856ac90b8eda', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 22:58:46.644063+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9a0169b-5280-4ec9-9797-139d99823575', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 23:56:47.290206+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e77e092-b26a-4808-b9d9-81461bcdca66', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-18 23:56:47.292402+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c884d7e9-d6fb-42a4-b2ed-cbe2f572cf60', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 00:55:05.084281+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a01ac34b-d20d-49f4-b339-9e6ca085a1b4', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 00:55:05.08691+00', ''),
	('00000000-0000-0000-0000-000000000000', '95a843bf-ca81-4043-a66f-72e40e3ffad7', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 01:53:13.491545+00', ''),
	('00000000-0000-0000-0000-000000000000', '280d137c-9a3f-4272-935d-27af61f2685f', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 01:53:13.492895+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fde9ed64-ce29-4731-aa92-2f211a039cd0', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 02:51:37.401523+00', ''),
	('00000000-0000-0000-0000-000000000000', '03729c3c-8a89-43c9-8066-8805246b5268', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 02:51:37.404756+00', ''),
	('00000000-0000-0000-0000-000000000000', '62202eb9-fd87-41c1-81bf-ab07d7951c56', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 10:22:21.462037+00', ''),
	('00000000-0000-0000-0000-000000000000', '31260c1c-5f39-4445-a50e-f95fc7eea0a8', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 10:22:21.468688+00', ''),
	('00000000-0000-0000-0000-000000000000', '76ded441-e0fa-4c78-bde7-d17bed8d5b17', '{"action":"token_refreshed","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 11:20:39.308807+00', ''),
	('00000000-0000-0000-0000-000000000000', '62ebad4f-d6c3-4f7b-ad2e-01ea8e8f1165', '{"action":"token_revoked","actor_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 11:20:39.310712+00', ''),
	('00000000-0000-0000-0000-000000000000', '703de01e-db68-4e2c-81bd-cd1997bb6b61', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-19 11:47:29.196133+00', ''),
	('00000000-0000-0000-0000-000000000000', '584c25f4-4040-41f5-adb9-876c9e8394fd', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 12:45:39.581644+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e6eafcb-c0e0-495b-9088-c81951c8f6f4', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 12:45:39.582352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fca316ac-c365-49a5-91ef-93c6620a6f04', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 13:43:52.119991+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f20b4f4-f310-490d-a259-9194bc75da9d', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 13:43:52.121274+00', ''),
	('00000000-0000-0000-0000-000000000000', '6593994b-b201-4c81-92d2-70ea281dbe37', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 14:41:52.497497+00', ''),
	('00000000-0000-0000-0000-000000000000', '1119d295-6acc-4093-8eca-2b084707ce97', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 14:41:52.499805+00', ''),
	('00000000-0000-0000-0000-000000000000', '499f04ad-2dc7-4a19-b790-c0ea4935fe0b', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 15:36:58.840593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcebee9c-46a7-41a3-bb68-d6c4d756fc54', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 15:36:58.864569+00', ''),
	('00000000-0000-0000-0000-000000000000', '1272301b-2be7-4d47-ae11-13a1820b9b58', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 16:35:14.339448+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1b544d7-3d96-42f8-935e-51de4f111fc2', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 16:35:14.341106+00', ''),
	('00000000-0000-0000-0000-000000000000', '699efc65-2e2e-46da-b5cd-a042b00c079f', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 17:33:14.678575+00', ''),
	('00000000-0000-0000-0000-000000000000', '19cc2b65-1d75-4837-9b7c-fc05b3052bd5', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 17:33:14.680216+00', ''),
	('00000000-0000-0000-0000-000000000000', '71f816cb-ce70-4dfb-bcd3-18f5e9791752', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 18:31:15.386163+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc5b6348-71a0-462c-aa85-0962d3982dd8', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 18:31:15.38767+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f25fb92a-6812-4da4-851d-c1ec5379a8ae', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 19:55:27.407839+00', ''),
	('00000000-0000-0000-0000-000000000000', '626179aa-138e-41ed-851d-c4b1e49dbe21', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 19:55:27.409087+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6b2f7ce-ed4e-4bd5-8731-db5b4114e88c', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 20:53:56.683377+00', ''),
	('00000000-0000-0000-0000-000000000000', '710b9029-fc68-4b54-8009-729371210704', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 20:53:56.686446+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f7c8ba4-3057-4d61-807f-d5ae9305457f', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 21:52:25.241233+00', ''),
	('00000000-0000-0000-0000-000000000000', '7689d2b1-e765-4196-a2e3-955aa1ece0b8', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-19 21:52:25.242755+00', ''),
	('00000000-0000-0000-0000-000000000000', '08f13292-7318-4008-b2ba-0709bff32da6', '{"action":"login","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-19 23:23:14.727827+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1e8f3a3-3ce9-4995-a756-3f2dad4fe38f', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 00:21:34.634132+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2a63536-1659-42f7-9ae5-503145edc29a', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 00:21:34.638473+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ccd8c35-4add-441c-a26c-21e398f9c163', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 01:19:34.986306+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cada63bb-0343-49d9-9552-5c123a96d981', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 01:19:34.986956+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed7d557f-c823-4553-b0eb-4bd767d7b671', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 02:17:35.450229+00', ''),
	('00000000-0000-0000-0000-000000000000', '57462231-8e56-4f2e-838f-63da9e255722', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 02:17:35.450664+00', ''),
	('00000000-0000-0000-0000-000000000000', '5edf8722-ed10-49d1-89df-075b68f3f52a', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 03:15:35.750641+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c320ebb-ffd7-4c1a-8bb0-e4303aedfb36', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 03:15:35.751137+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efb35b3f-6e0f-4956-9e55-f33cfa9bc395', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 04:13:47.840746+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ef8590d-5dba-4a24-881c-1578f45618b0', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 04:13:47.841446+00', ''),
	('00000000-0000-0000-0000-000000000000', '91387403-fa3d-4268-86ce-f15b3ddf87eb', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 05:12:13.177686+00', ''),
	('00000000-0000-0000-0000-000000000000', '6400151f-ac03-47b1-a521-480001e1a597', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 05:12:13.178234+00', ''),
	('00000000-0000-0000-0000-000000000000', '7218c238-bb8d-4576-a2d6-97cb65b041b3', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 06:10:39.558769+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d14f040-324b-46b6-9a21-c8d52ddde0c4', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 06:10:39.559249+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f436d6b-ec7d-40b2-a81f-71ce97e93598', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 07:09:08.822766+00', ''),
	('00000000-0000-0000-0000-000000000000', '45542f71-3191-4c2b-9fcb-888dbf195d00', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 07:09:08.823419+00', ''),
	('00000000-0000-0000-0000-000000000000', '444458a7-9313-41dd-aaec-3a73b1ab047b', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester4@example.com","user_id":"49d3fe48-bd38-4d9c-b076-06c08331a7f8","user_phone":""}}', '2026-02-20 21:13:13.081085+00', ''),
	('00000000-0000-0000-0000-000000000000', '99f759ea-a694-47c3-81f4-a98fd15ae5ea', '{"action":"token_refreshed","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 21:14:29.745083+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c2ba384-7c9c-4baa-954a-5c7ee3bfb284', '{"action":"token_revoked","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"token"}', '2026-02-20 21:14:29.746688+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b04ef208-6235-4842-ae7f-c70d4693a889', '{"action":"logout","actor_id":"b25d86b8-29a1-4f18-9c69-b3d9c047265e","actor_username":"tester@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-20 21:16:18.055558+00', ''),
	('00000000-0000-0000-0000-000000000000', '22a44824-9cfb-41e1-bc05-ea2f5f5d5704', '{"action":"login","actor_id":"49d3fe48-bd38-4d9c-b076-06c08331a7f8","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-20 21:16:32.32529+00', ''),
	('00000000-0000-0000-0000-000000000000', '7908b875-2193-4d50-83b0-6d689fac995a', '{"action":"logout","actor_id":"49d3fe48-bd38-4d9c-b076-06c08331a7f8","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-20 22:13:55.236232+00', ''),
	('00000000-0000-0000-0000-000000000000', '4025a90f-325e-4530-8f92-b2a72cb15f55', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester5@example.com","user_id":"f120a48f-b9a7-4022-83ac-c96e46a7fd78","user_phone":""}}', '2026-02-20 22:14:15.24222+00', ''),
	('00000000-0000-0000-0000-000000000000', '2dc5dc00-4f0c-4d9a-8e28-77fb4c2f15c5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester4@example.com","user_id":"49d3fe48-bd38-4d9c-b076-06c08331a7f8","user_phone":""}}', '2026-02-20 22:14:15.241966+00', ''),
	('00000000-0000-0000-0000-000000000000', '86e1f0db-ec16-44b0-82a0-8109d7e2a395', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester4@example.com","user_id":"14a58a51-bf54-401b-9144-0f5a29898608","user_phone":""}}', '2026-02-20 22:14:36.806286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3c886e2-6d9e-47bd-b8de-bb648789c175', '{"action":"login","actor_id":"14a58a51-bf54-401b-9144-0f5a29898608","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-20 22:14:55.56676+00', ''),
	('00000000-0000-0000-0000-000000000000', '432765f2-e2a8-47fb-adc6-77fad9aa75c5', '{"action":"logout","actor_id":"14a58a51-bf54-401b-9144-0f5a29898608","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-20 22:29:16.875605+00', ''),
	('00000000-0000-0000-0000-000000000000', '391923cf-9ae5-4866-b072-1c7423019176', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester4@example.com","user_id":"14a58a51-bf54-401b-9144-0f5a29898608","user_phone":""}}', '2026-02-20 22:29:29.398891+00', ''),
	('00000000-0000-0000-0000-000000000000', '73372695-a26b-4d34-86ad-ad180a7c8ffa', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester4@example.com","user_id":"ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf","user_phone":""}}', '2026-02-20 22:30:31.802712+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d1338dd-19f7-4f15-a792-ed5af1558be6', '{"action":"login","actor_id":"ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-20 22:30:35.851219+00', ''),
	('00000000-0000-0000-0000-000000000000', '4449d8cb-c3bc-4c9f-9dc6-ee09af580412', '{"action":"user_confirmation_requested","actor_id":"3b7da897-50ad-4aa4-953c-59fb87880116","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-21 01:02:59.152818+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dcf7363a-a385-4795-8785-aab8912bffae', '{"action":"login","actor_id":"ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-21 01:06:39.068015+00', ''),
	('00000000-0000-0000-0000-000000000000', '1032f357-4e56-4a93-8c71-f02ecd0b2576', '{"action":"logout","actor_id":"ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf","actor_username":"tester4@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-21 01:08:28.021062+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcb3e419-2477-4077-bf54-9a6360a30fbc', '{"action":"user_confirmation_requested","actor_id":"3b7da897-50ad-4aa4-953c-59fb87880116","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"user"}', '2026-02-21 02:12:42.77691+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8f8ada1-5a5e-4e38-b092-7acc40baf564', '{"action":"user_signedup","actor_id":"3b7da897-50ad-4aa4-953c-59fb87880116","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-21 02:13:08.00023+00', ''),
	('00000000-0000-0000-0000-000000000000', '735967f0-ae8a-47f4-ade8-0eab6a354c34', '{"action":"login","actor_id":"3b7da897-50ad-4aa4-953c-59fb87880116","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-21 02:13:25.986415+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1b30df0-f431-4773-be01-66dcd51c8d14', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester5@example.com","user_id":"3b7da897-50ad-4aa4-953c-59fb87880116","user_phone":""}}', '2026-02-21 02:13:50.182465+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a60a493c-b883-447c-becd-df99999fd84e', '{"action":"user_confirmation_requested","actor_id":"d7cb209f-f94b-4280-9a00-fd3c4404b062","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-21 02:14:25.530468+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c456e83-c60e-4a4e-93e9-0aed30870b43', '{"action":"user_confirmation_requested","actor_id":"d7cb209f-f94b-4280-9a00-fd3c4404b062","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"user"}', '2026-02-21 02:19:51.482115+00', ''),
	('00000000-0000-0000-0000-000000000000', '0043a160-62f5-4386-848d-1951dde3ed10', '{"action":"user_signedup","actor_id":"d7cb209f-f94b-4280-9a00-fd3c4404b062","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-21 02:20:35.596099+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f687e1b-eb12-463d-a00c-3d725c302538', '{"action":"logout","actor_id":"d7cb209f-f94b-4280-9a00-fd3c4404b062","actor_username":"tester5@example.com","actor_via_sso":false,"log_type":"account"}', '2026-02-21 02:23:32.794059+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2cd2bf9-e43a-4a5d-a1c3-62b919bd05d0', '{"action":"user_confirmation_requested","actor_id":"251bd44b-12e1-486e-bfeb-974995333677","actor_username":"tester6@example.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-21 02:23:52.902247+00', ''),
	('00000000-0000-0000-0000-000000000000', '0578deb4-deaa-4e06-844a-13a6ddc158ec', '{"action":"user_confirmation_requested","actor_id":"c8e4adcd-ae50-4051-a72e-451e7bcaede2","actor_username":"tester6@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-02-21 02:52:31.718564+00', ''),
	('00000000-0000-0000-0000-000000000000', '0aaa3f71-e8b7-4154-b57d-d50012402775', '{"action":"user_confirmation_requested","actor_id":"c8e4adcd-ae50-4051-a72e-451e7bcaede2","actor_username":"tester6@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-21 02:53:05.8476+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8edd64d-f15d-42be-bdd6-062160a75da5', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-21 09:36:15.87838+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ba7ebe4-9f4d-4cf8-a074-4e86d05825ac', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-21 09:37:43.832591+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6631fd0-9444-459c-81d9-e25a262b6d07', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-21 09:42:18.277101+00', ''),
	('00000000-0000-0000-0000-000000000000', '127cd95a-67e4-4097-bd76-74bf99873487', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-21 09:42:24.525666+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd4dabb0-ba7f-4c7d-9d11-bb32390c8a39', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-21 20:28:35.468743+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6c138b0-93a6-4d3b-bea0-a5df05be9de5', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 21:26:46.125774+00', ''),
	('00000000-0000-0000-0000-000000000000', '05e48723-f430-4226-bec7-702f2a84993d', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 21:26:46.126852+00', ''),
	('00000000-0000-0000-0000-000000000000', '08570f63-a067-4b02-b513-85bf9d591bbc', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 22:24:53.706834+00', ''),
	('00000000-0000-0000-0000-000000000000', '507e5d54-892c-42c6-9060-5725d1a8c09e', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 22:24:53.707422+00', ''),
	('00000000-0000-0000-0000-000000000000', '902cc3a0-e110-4291-88bb-032e11078952', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 23:22:54.075422+00', ''),
	('00000000-0000-0000-0000-000000000000', '8842e600-b2a4-47e4-b414-6b047746c97d', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-21 23:22:54.076286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c709b8a5-90e6-4588-8192-d368b7c81bd4', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 00:20:54.638513+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7b5af7c-19c0-4968-a1a4-c4e452198c87', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 00:20:54.641692+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c81ab19e-b333-48f1-a2e9-e7ade41f7ed1', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 01:18:54.807817+00', ''),
	('00000000-0000-0000-0000-000000000000', '099298c6-3f8b-44fe-b7e9-1ea997227d28', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 01:18:54.808655+00', ''),
	('00000000-0000-0000-0000-000000000000', '00cf3d4b-6318-4209-8608-aced3de9dbed', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 02:16:55.222866+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c9093b7-2ea0-43a3-b143-873498e2c3f3', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 02:16:55.225764+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9bfbdd5-734e-4e1d-b52d-229d06e8d3e2', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 03:12:37.801821+00', ''),
	('00000000-0000-0000-0000-000000000000', '516776df-9c5e-401d-82e7-7395ca1c8763', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 03:14:13.531186+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1722217-6af6-4475-8b01-6f3d85706dfd', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 03:16:07.840935+00', ''),
	('00000000-0000-0000-0000-000000000000', '343ab6b0-2d9d-4357-82f1-859247761096', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 04:08:36.905505+00', ''),
	('00000000-0000-0000-0000-000000000000', '934071df-f755-4cf2-b796-5878bdfa032b', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 05:08:29.38641+00', ''),
	('00000000-0000-0000-0000-000000000000', '43b279c1-2db9-41e3-9245-b51c72ae614c', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 05:08:29.387255+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4bb80b5-d6ad-4e19-bb2c-e5d0af485ce7', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 06:06:30.637696+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed232134-f8f8-4af4-801d-26d0c25be900', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 06:06:30.638487+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5bd9292-e110-4a82-b1cf-982b1b62965c', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 07:05:00.718776+00', ''),
	('00000000-0000-0000-0000-000000000000', '82667e4e-d7f1-4d24-afc3-728fcb50f79f', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 07:05:00.719408+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0cf2ffd-6ebb-4637-843b-74da5b1aeb04', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 08:03:01.106891+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b859c61f-c6ac-4e43-8875-c3559fb80307', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 08:03:01.11128+00', ''),
	('00000000-0000-0000-0000-000000000000', '51da8000-e852-41d0-b7ae-591286261454', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 09:01:30.964584+00', ''),
	('00000000-0000-0000-0000-000000000000', '6270d92e-2edc-4eee-a15d-746d69d746fc', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 09:01:30.965301+00', ''),
	('00000000-0000-0000-0000-000000000000', '7df9fe81-05c9-4809-b7dd-66147587f42d', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 09:56:30.78046+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e7bbc26-1ffa-48ea-83c4-7fecd992a23d', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 09:56:53.484298+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a92665ae-911d-4d05-b088-79dc83d002f4', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 10:27:01.248378+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da0c330e-433a-47d8-ac09-90597a80887e', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 10:27:22.839775+00', ''),
	('00000000-0000-0000-0000-000000000000', '471d26d8-f65d-4623-89ad-9f3e803109bc', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 11:16:58.981651+00', ''),
	('00000000-0000-0000-0000-000000000000', '42e39254-704e-4f9c-b4ba-564b7f40ceba', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester7@ktu.edu.gh","user_id":"e17d790c-eb2b-4071-a587-74048dabdb81","user_phone":""}}', '2026-02-22 11:17:26.941154+00', ''),
	('00000000-0000-0000-0000-000000000000', '810d8707-f55a-42b4-b7b7-c248794be3cb', '{"action":"login","actor_id":"e17d790c-eb2b-4071-a587-74048dabdb81","actor_username":"tester7@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 11:21:16.426035+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9a36f4f-a342-48dd-adbf-edfd834c9a7a', '{"action":"token_refreshed","actor_id":"e17d790c-eb2b-4071-a587-74048dabdb81","actor_username":"tester7@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 12:19:44.912004+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa34947f-5a79-4f99-9007-c8aad48ccc56', '{"action":"token_revoked","actor_id":"e17d790c-eb2b-4071-a587-74048dabdb81","actor_username":"tester7@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 12:19:44.912663+00', ''),
	('00000000-0000-0000-0000-000000000000', '98ecae29-e3ee-4204-b959-c20f292e6294', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tester7@ktu.edu.gh","user_id":"e17d790c-eb2b-4071-a587-74048dabdb81","user_phone":""}}', '2026-02-22 13:05:27.367658+00', ''),
	('00000000-0000-0000-0000-000000000000', '39b0b2ee-fab9-4be7-b180-091ba181390b', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 13:05:52.283467+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f6c3bc3-2f7a-4e80-aa37-f0c9b3b17fdd', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-22 13:06:00.16248+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc8fa49d-f609-4516-a963-322105d9354f', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-22 13:06:49.415841+00', ''),
	('00000000-0000-0000-0000-000000000000', '1337beaf-a655-415f-843f-ac59ca725a89', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 14:05:05.913055+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e39364e-6264-4849-a03a-970a9d7572de', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-22 14:05:05.913793+00', ''),
	('00000000-0000-0000-0000-000000000000', '150dbe68-621e-4241-a656-d654615959ba', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 12:17:03.825045+00', ''),
	('00000000-0000-0000-0000-000000000000', '46942e28-1a92-4e0d-99b0-70b09e275618', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 13:37:01.597945+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e0e49695-a21b-4973-83d5-a38845c5aad6', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:09:30.14737+00', ''),
	('00000000-0000-0000-0000-000000000000', '96ba72ad-6751-4cab-b07b-ffb4e298bf01', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:09:47.506821+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8fccbb5-3189-404f-a7fe-71ff43359a30', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:09:50.689756+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a889302-1b1d-4533-81cf-f263ec34e39c', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:09:51.807151+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af22e614-1403-42ee-913f-ea3e6f315d2d', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:09:52.916968+00', ''),
	('00000000-0000-0000-0000-000000000000', '439b2260-7521-49a9-a224-b7068ee2f008', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:09:53.870088+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2acfd91-3dac-4dc5-8df8-a4e6c9b50597', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:15:04.756801+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f39d2d3-8d0c-419b-9660-70a97fc851af', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:15:28.920177+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df25d802-0555-4bfa-9348-2550f75268e0', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:17:18.425596+00', ''),
	('00000000-0000-0000-0000-000000000000', '609f6bfa-cd99-4596-bce0-251cf7c7a5ba', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:19:06.80201+00', ''),
	('00000000-0000-0000-0000-000000000000', '95d01473-249a-4acd-b492-c5859824d770', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:19:35.176978+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba87b78e-cf41-4153-9276-d9fe3eacde06', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:20:05.894549+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f0ed094-90bd-4344-892e-3d11d1ba30a8', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:29:13.120369+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bccbf1f9-3ed2-4fdd-bac2-d1f89e36c4c6', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:37:28.910444+00', ''),
	('00000000-0000-0000-0000-000000000000', '74db7268-3974-4bc4-b6e8-c5a9d114816a', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:38:58.628151+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef9e6ba3-1a93-42eb-aa2a-8a4b12648d28', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:45:29.263868+00', ''),
	('00000000-0000-0000-0000-000000000000', '610f99c7-e5b2-47e5-b9c8-1f952256ba0d', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:45:48.021746+00', ''),
	('00000000-0000-0000-0000-000000000000', '0dad86c7-958a-429b-ba23-30dc50131eca', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:46:07.631004+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db8f98b2-f4af-4ef1-9780-7ec87b5cf2a5', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:53:00.870757+00', ''),
	('00000000-0000-0000-0000-000000000000', '64e3263a-ce5a-499d-98c1-d2388d6afa2f', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:53:20.2341+00', ''),
	('00000000-0000-0000-0000-000000000000', '0127802b-a705-4c3f-bafc-ca0f3f93b39d', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 14:53:44.22431+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f31ff5c-fe96-49ea-934d-1092a3f154d0', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 14:54:01.714727+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f299f98a-9c4a-4218-80fd-82df42c3a351', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 18:02:50.903289+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e711f0b-9419-4e25-90e2-def454da43a5', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 18:02:59.029052+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd26dc9a-de0f-48d1-9e67-bf4f94fd012d', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 18:03:17.128025+00', ''),
	('00000000-0000-0000-0000-000000000000', '01f9c5fd-4f04-4665-8f97-bef5d1ffaec3', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-25 19:35:50.08834+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd7e6b7b-db9f-4eac-ab78-102cf002d4c3', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-25 19:35:50.089161+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a531b5ff-7cd5-4d4d-ac19-66aa57f1e1e5', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-25 20:33:52.227662+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ca8f6de-1078-4efb-8ca9-28e5cdedf8c8', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-25 20:33:52.228454+00', ''),
	('00000000-0000-0000-0000-000000000000', '7cef1060-85c1-41e9-9955-73bf7834baac', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-25 21:23:48.048582+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce7e0766-a662-4b1c-844f-ae17504cb6d5', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 21:24:14.356882+00', ''),
	('00000000-0000-0000-0000-000000000000', '5bf14359-d421-48a3-bc59-02dbd0e61780', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-26 05:58:53.453534+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7ad26c9-a1fb-4e5d-8d12-9fcda1d677cc', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-26 05:58:53.45612+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d98af8c-abfb-4be6-aca4-487cd7e99f46', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-26 07:03:17.488018+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa2bfac2-f8c9-4e90-8c34-8d3bdb379d26', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-26 07:03:17.48869+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d921fda-5e5a-4a75-9b95-979b18511b7c', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 00:52:04.989494+00', ''),
	('00000000-0000-0000-0000-000000000000', '37f96ec0-0231-409f-a31b-550b9a167428', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 01:50:12.835944+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5ae24ba-2f8e-47e2-a883-49ab2194907c', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 01:50:12.838321+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ad2eb65-08ee-4b44-918d-4acab99772e1', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-27 02:33:32.409135+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b90f9f27-43cc-419e-a38e-a914d53d9e60', '{"action":"user_confirmation_requested","actor_id":"c8e4adcd-ae50-4051-a72e-451e7bcaede2","actor_username":"tester6@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-27 02:34:07.799031+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f48d93b0-25b5-4dd4-a30b-2f4d98118648', '{"action":"user_signedup","actor_id":"c8e4adcd-ae50-4051-a72e-451e7bcaede2","actor_username":"tester6@ktu.edu.gh","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-02-27 02:34:36.454836+00', ''),
	('00000000-0000-0000-0000-000000000000', '2afe0662-0f87-4b2b-a975-fc3ca18c9aa7', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester2@ktu.edu.gh","user_id":"832a4878-5cdf-4f29-aefe-9720b549fc62","user_phone":""}}', '2026-02-27 02:51:30.320024+00', ''),
	('00000000-0000-0000-0000-000000000000', '2597b298-ed74-4f30-8353-01c7949eb0db', '{"action":"login","actor_id":"832a4878-5cdf-4f29-aefe-9720b549fc62","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 02:51:49.203029+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ec64b4e-a6a5-4718-a83d-48433b197c9f', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 03:06:29.62048+00', ''),
	('00000000-0000-0000-0000-000000000000', '070ea056-1f4a-4cfb-bd54-18b6b574e5db', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 04:04:54.697296+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a724a59-d085-4c2c-be87-ecdefd7ef78b', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 04:04:54.698448+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b81d624e-2ed2-465d-a98b-9c508cedb249', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 04:17:46.034493+00', ''),
	('00000000-0000-0000-0000-000000000000', '089a5566-e8b7-4730-8ac5-902e741cf19e', '{"action":"user_updated_password","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-27 04:17:46.273833+00', ''),
	('00000000-0000-0000-0000-000000000000', '6164b68f-54fb-46b3-aa48-3bd5accd48a1', '{"action":"user_modified","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-27 04:17:46.274285+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1747689-e7d3-4c24-9e82-97d87c1fd8e8', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-27 04:17:46.35355+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca21fa07-da5a-4e3e-840f-021ed2f041d6', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 04:18:13.042211+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe824a4b-388d-4ba6-b2c3-462e4cb548f2', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 04:20:40.900234+00', ''),
	('00000000-0000-0000-0000-000000000000', '412667a7-a44a-4087-9b92-d447f9b19cbf', '{"action":"user_updated_password","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-27 04:20:41.135116+00', ''),
	('00000000-0000-0000-0000-000000000000', '9073562f-1682-42ed-bc1f-ecdf45588dda', '{"action":"user_modified","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-02-27 04:20:41.135531+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b649326d-511f-42f0-9d00-ef50cd1e4f4a', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-02-27 04:20:41.209958+00', ''),
	('00000000-0000-0000-0000-000000000000', '36924444-4bdd-41dd-a56a-6ad4c71cd1ee', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-27 04:23:14.705718+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e001737b-3f51-4ab9-8e35-5dcd10a21169', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 05:21:25.387008+00', ''),
	('00000000-0000-0000-0000-000000000000', '316d02e7-5b57-48e9-8ffa-034f28b07a45', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-02-27 05:21:25.388926+00', ''),
	('00000000-0000-0000-0000-000000000000', '37630493-e807-4565-90a6-85b6a2fc556c', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-01 16:47:14.153242+00', ''),
	('00000000-0000-0000-0000-000000000000', '938aa350-7db6-45e1-9843-ae37a5d140fb', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 17:45:36.917085+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0aed4b5-a2aa-4111-83a7-54e961832a2a', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 17:45:36.921417+00', ''),
	('00000000-0000-0000-0000-000000000000', '758d9f4c-9b8e-46a1-bc3b-d46dc78f0631', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 18:31:31.886187+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f80b4bd-a141-4424-9d40-866c63b72022', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 18:31:31.889651+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a1261ac-468a-4422-beb5-b357ece0527e', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 21:37:35.1008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf921a13-57c6-46bb-9ac2-8cefef31339b', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 21:37:35.103845+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bf72eac-a388-43e9-ba37-0c1f582a40b9', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 23:53:50.383026+00', ''),
	('00000000-0000-0000-0000-000000000000', '2812f619-a376-4af9-9e9c-7146457f8dfd', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-01 23:53:50.386316+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5e745ba-1d18-4cb6-9d27-a0b7a6c9efe4', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 10:14:18.920792+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b746d566-2775-4396-b15c-ac6d508ced46', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 10:14:18.925789+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f1ef5f7-d6fb-465e-8127-adb40ea64101', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 10:53:00.548356+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bdf8a6e-276f-4e58-ba0a-84e79ae363c3', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 10:53:00.550749+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f476999-478e-4888-8f04-c2a5eb50ee17', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 13:33:17.803167+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df238b9a-033a-4513-bb5c-9735cd6e09e7', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-02 13:33:17.804994+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8874f0f-a8e8-4c19-9b8f-fadb5195e3d5', '{"action":"token_refreshed","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-03 22:26:25.032917+00', ''),
	('00000000-0000-0000-0000-000000000000', '44fc925e-143f-4fad-ad3c-f34427105701', '{"action":"token_revoked","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-03 22:26:25.035977+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f2536a8-7504-4f03-80d6-79b84318ca32', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-03-03 22:26:34.547256+00', ''),
	('00000000-0000-0000-0000-000000000000', '14b90204-e2a3-4f6d-bdb3-86d2e302e341', '{"action":"user_confirmation_requested","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-03-03 22:26:57.644844+00', ''),
	('00000000-0000-0000-0000-000000000000', '547bb334-57ac-4f7d-8050-aba24e27bed8', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-03 22:50:44.352461+00', ''),
	('00000000-0000-0000-0000-000000000000', 'baa028a6-c27e-4a75-bce3-794cc223a404', '{"action":"login","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-03 22:58:19.843653+00', ''),
	('00000000-0000-0000-0000-000000000000', '092787aa-731e-4ff2-81d0-04553400a2e8', '{"action":"logout","actor_id":"d9397393-465a-4f1f-8983-b37a10d17f1b","actor_username":"tester1@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-03-03 23:23:37.175119+00', ''),
	('00000000-0000-0000-0000-000000000000', '871f1845-683c-423a-b12f-fe7e44224151', '{"action":"user_confirmation_requested","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"user"}', '2026-03-03 23:26:02.860177+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a389e421-8fb5-44b2-9567-927275ff50b8', '{"action":"user_signedup","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-03-03 23:26:41.624175+00', ''),
	('00000000-0000-0000-0000-000000000000', '94159295-84af-4f73-ace0-692a3d7bd184', '{"action":"token_refreshed","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-04 00:24:50.843895+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eacbf792-7122-489c-8ad9-b2e800f82f86', '{"action":"token_revoked","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"token"}', '2026-03-04 00:24:50.844332+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c685c910-86f9-493b-9e11-be8a361984ae', '{"action":"logout","actor_id":"a1209526-1ad1-457d-9175-f4d080a594c7","actor_username":"tester2@ktu.edu.gh","actor_via_sso":false,"log_type":"account"}', '2026-03-04 00:59:11.937462+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a585793-6eed-4d90-9b26-0afe7b220d87', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"tester3@ktu.edu.gh","user_id":"43b68bf0-ff0e-4580-9848-3cb8fd626881","user_phone":""}}', '2026-03-04 00:59:53.043596+00', ''),
	('00000000-0000-0000-0000-000000000000', '05a2ee1e-a283-4da0-83c1-46e33b837852', '{"action":"login","actor_id":"43b68bf0-ff0e-4580-9848-3cb8fd626881","actor_username":"tester3@ktu.edu.gh","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-04 01:00:34.92068+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ca04ac35-df83-4bf1-ad2b-c20578d4b364', 'authenticated', 'authenticated', 'tester3@example.com', '$2a$10$D6j7kVA6FjvyKI7AS1LrUehn1abzoCqFdu9lmHTebmiIOipQo.OQ.', '2026-02-13 23:27:38.413165+00', NULL, '', '2026-02-13 23:27:09.37808+00', '', NULL, '', '', NULL, '2026-02-13 23:27:38.418211+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ca04ac35-df83-4bf1-ad2b-c20578d4b364", "email": "tester3@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-13 23:27:09.363979+00', '2026-02-13 23:27:38.425883+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8f9936fc-e0db-48f5-a04b-b66396c9b341', 'authenticated', 'authenticated', 'kvngnathan8420@gmail.com', '$2a$10$eZn9z2roDU0XF2H/wr.cW..H6yj6BnfW.XnTuI0U9dQq6vnSMJJSu', '2026-02-10 12:18:33.819749+00', NULL, '', '2026-02-10 12:18:09.108425+00', '', NULL, '', '', NULL, '2026-02-10 12:18:33.833121+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8f9936fc-e0db-48f5-a04b-b66396c9b341", "email": "kvngnathan8420@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-10 12:18:09.103009+00', '2026-02-10 12:18:33.842641+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '251bd44b-12e1-486e-bfeb-974995333677', 'authenticated', 'authenticated', 'tester6@example.com', '$2a$10$6Ja1h8EfiH1EYD67PlgHP.XRLDSugRCn1Up.PGsxHmRkH9vZniWCu', NULL, NULL, 'd11a2175332e820cd9897e82bace6473ce1cbe3cb840f14ea6f9cd61', '2026-02-21 02:23:52.902758+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "251bd44b-12e1-486e-bfeb-974995333677", "email": "tester6@example.com", "email_verified": false, "phone_verified": false}', NULL, '2026-02-21 02:23:52.893864+00', '2026-02-21 02:23:52.917401+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'authenticated', 'authenticated', 'tester@example.com', '$2a$10$SdG3CHqexf2cFVdnjotrAebcSwtFKS/./jQdabevBZueWMvYvVkne', '2025-11-15 00:53:49.047693+00', NULL, '', '2025-11-15 00:53:22.034913+00', '', NULL, '', '', NULL, '2026-02-19 23:23:14.732682+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "b25d86b8-29a1-4f18-9c69-b3d9c047265e", "email": "tester@example.com", "email_verified": true, "phone_verified": false}', NULL, '2025-11-15 00:53:22.016507+00', '2026-02-20 21:14:29.749425+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf', 'authenticated', 'authenticated', 'tester4@example.com', '$2a$10$cltB1YacazJwmFV6zwsCuObC/MTDWL86EEk2Vcq6EO.2jarnJykXm', '2026-02-20 22:30:31.803333+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-21 01:06:39.070813+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-02-20 22:30:31.799503+00', '2026-02-21 01:06:39.07995+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd7cb209f-f94b-4280-9a00-fd3c4404b062', 'authenticated', 'authenticated', 'tester5@example.com', '$2a$10$jrU08nXy9/bYZLtbFXc0tegaaDPZ8m.Ny.qdLCBoYc2VDaw7Sp7Ga', '2026-02-21 02:20:35.597458+00', NULL, '', '2026-02-21 02:19:51.484433+00', '', NULL, '', '', NULL, '2026-02-21 02:20:35.606548+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d7cb209f-f94b-4280-9a00-fd3c4404b062", "email": "tester5@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-21 02:14:25.520493+00', '2026-02-21 02:20:35.612102+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a1209526-1ad1-457d-9175-f4d080a594c7', 'authenticated', 'authenticated', 'tester2@ktu.edu.gh', '$2a$10$mq4j2vZ9q3XG1fmTGblfmOXPhc6whnkhd7NnMSRVB7.zuFTtpFsIu', '2026-03-03 23:26:41.625122+00', NULL, '', '2026-03-03 23:26:02.861975+00', '', NULL, '', '', NULL, '2026-03-03 23:26:41.629977+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a1209526-1ad1-457d-9175-f4d080a594c7", "email": "tester2@ktu.edu.gh", "email_verified": true, "phone_verified": false}', NULL, '2026-03-03 22:26:57.637202+00', '2026-03-04 00:24:50.847072+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd9397393-465a-4f1f-8983-b37a10d17f1b', 'authenticated', 'authenticated', 'tester1@ktu.edu.gh', '$2a$10$6FI5Fw1by3lemzLXCe9DmeLbpa9eDQ8fnw1xz.1Vtdz6iSqBxl2nm', '2026-02-10 10:14:30.852145+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-03 22:58:19.844578+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d9397393-465a-4f1f-8983-b37a10d17f1b", "email": "tester1@ktu.edu.gh", "email_verified": true, "phone_verified": false}', NULL, '2026-02-10 10:13:45.491387+00', '2026-03-03 22:58:19.847167+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '43b68bf0-ff0e-4580-9848-3cb8fd626881', 'authenticated', 'authenticated', 'tester3@ktu.edu.gh', '$2a$10$Kfnymd548xzWZoBfkbB9EO3zIP9L.GiQalszMoEDID9UPZxsgt8Fa', '2026-03-04 00:59:53.04431+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-03-04 01:00:34.921685+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-03-04 00:59:53.04006+00', '2026-03-04 01:00:34.924101+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('8f9936fc-e0db-48f5-a04b-b66396c9b341', '8f9936fc-e0db-48f5-a04b-b66396c9b341', '{"sub": "8f9936fc-e0db-48f5-a04b-b66396c9b341", "email": "kvngnathan8420@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-10 12:18:09.106837+00', '2026-02-10 12:18:09.106867+00', '2026-02-10 12:18:09.106867+00', '27c7c52e-e6a4-419d-8c75-8bca23496da8'),
	('ca04ac35-df83-4bf1-ad2b-c20578d4b364', 'ca04ac35-df83-4bf1-ad2b-c20578d4b364', '{"sub": "ca04ac35-df83-4bf1-ad2b-c20578d4b364", "email": "tester3@example.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-13 23:27:09.375+00', '2026-02-13 23:27:09.375031+00', '2026-02-13 23:27:09.375031+00', '3f39c375-5363-4e1d-8a56-bf23b165f36f'),
	('b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{"sub": "b25d86b8-29a1-4f18-9c69-b3d9c047265e", "email": "tester@example.com", "email_verified": true, "phone_verified": false}', 'email', '2025-11-15 00:53:22.030435+00', '2025-11-15 00:53:22.030468+00', '2025-11-15 00:53:22.030468+00', 'bd78c32e-8797-4d56-a5b4-b80b4845600d'),
	('d9397393-465a-4f1f-8983-b37a10d17f1b', 'd9397393-465a-4f1f-8983-b37a10d17f1b', '{"sub": "d9397393-465a-4f1f-8983-b37a10d17f1b", "email": "tester1@ktu.edu.gh", "email_verified": true, "phone_verified": false}', 'email', '2026-02-10 10:13:45.502386+00', '2026-02-10 10:13:45.502837+00', '2026-02-10 10:13:45.502837+00', '0cf9b147-b9b3-4b63-a6b0-78a819a5d6f5'),
	('ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf', 'ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf', '{"sub": "ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf", "email": "tester4@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-20 22:30:31.802255+00', '2026-02-20 22:30:31.802292+00', '2026-02-20 22:30:31.802292+00', 'a70d128b-da59-4107-93e6-58eb402980e8'),
	('d7cb209f-f94b-4280-9a00-fd3c4404b062', 'd7cb209f-f94b-4280-9a00-fd3c4404b062', '{"sub": "d7cb209f-f94b-4280-9a00-fd3c4404b062", "email": "tester5@example.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-21 02:14:25.528416+00', '2026-02-21 02:14:25.528452+00', '2026-02-21 02:14:25.528452+00', '06bf0592-196f-4068-8d11-62805555b911'),
	('251bd44b-12e1-486e-bfeb-974995333677', '251bd44b-12e1-486e-bfeb-974995333677', '{"sub": "251bd44b-12e1-486e-bfeb-974995333677", "email": "tester6@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-21 02:23:52.899324+00', '2026-02-21 02:23:52.89951+00', '2026-02-21 02:23:52.89951+00', '78627aa7-5884-4cf4-a8ef-a23f016c5a10'),
	('a1209526-1ad1-457d-9175-f4d080a594c7', 'a1209526-1ad1-457d-9175-f4d080a594c7', '{"sub": "a1209526-1ad1-457d-9175-f4d080a594c7", "email": "tester2@ktu.edu.gh", "email_verified": true, "phone_verified": false}', 'email', '2026-03-03 22:26:57.643444+00', '2026-03-03 22:26:57.643473+00', '2026-03-03 22:26:57.643473+00', '3723a379-4f7b-421f-9262-3f603e31c26f'),
	('43b68bf0-ff0e-4580-9848-3cb8fd626881', '43b68bf0-ff0e-4580-9848-3cb8fd626881', '{"sub": "43b68bf0-ff0e-4580-9848-3cb8fd626881", "email": "tester3@ktu.edu.gh", "email_verified": false, "phone_verified": false}', 'email', '2026-03-04 00:59:53.042951+00', '2026-03-04 00:59:53.042979+00', '2026-03-04 00:59:53.042979+00', '5b3ba3e4-1508-462e-8006-6c80d3d7aa99');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('fec6be27-ae00-4aac-a9d0-3ee32283a067', '43b68bf0-ff0e-4580-9848-3cb8fd626881', '2026-03-04 01:00:34.922101+00', '2026-03-04 01:00:34.922101+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '192.168.97.1', NULL, NULL, NULL, NULL, NULL),
	('4b362b9f-a655-4fad-88a6-7ffd4ecfa7d2', '8f9936fc-e0db-48f5-a04b-b66396c9b341', '2026-02-10 12:18:33.833677+00', '2026-02-10 12:18:33.833677+00', NULL, 'aal1', NULL, NULL, 'KTUSRC/1 CFNetwork/3826.600.41 Darwin/24.6.0', '192.168.97.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('fec6be27-ae00-4aac-a9d0-3ee32283a067', '2026-03-04 01:00:34.92438+00', '2026-03-04 01:00:34.92438+00', 'password', '3540bb8e-1a6e-4dac-b845-73ee55c9d022'),
	('4b362b9f-a655-4fad-88a6-7ffd4ecfa7d2', '2026-02-10 12:18:33.843076+00', '2026-02-10 12:18:33.843076+00', 'otp', '7f5de34f-a45b-40fc-824e-b3aa14465b8c');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('0e979d34-0dac-4b32-962f-31f54f16da3f', '251bd44b-12e1-486e-bfeb-974995333677', 'confirmation_token', 'd11a2175332e820cd9897e82bace6473ce1cbe3cb840f14ea6f9cd61', 'tester6@example.com', '2026-02-21 02:23:52.919067', '2026-02-21 02:23:52.919067');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 105, 'upvwytddjfi7', '8f9936fc-e0db-48f5-a04b-b66396c9b341', false, '2026-02-10 12:18:33.837421+00', '2026-02-10 12:18:33.837421+00', NULL, '4b362b9f-a655-4fad-88a6-7ffd4ecfa7d2'),
	('00000000-0000-0000-0000-000000000000', 217, 't52qjdo474yw', '43b68bf0-ff0e-4580-9848-3cb8fd626881', false, '2026-03-04 01:00:34.923306+00', '2026-03-04 01:00:34.923306+00', NULL, 'fec6be27-ae00-4aac-a9d0-3ee32283a067');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: account_deletion_blacklist; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."account_deletion_blacklist" ("id", "email", "deleted_at") VALUES
	('9d7ea9db-9f6b-48ef-9aff-a7607ada4a9e', 'tester6@ktu.edu.gh', '2026-02-27 02:45:10.980184+00'),
	('c10b2a57-3001-46c9-a24c-eda911a78e8c', 'tester2@ktu.edu.gh', '2026-02-27 02:53:03.918618+00');


--
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."faculties" ("id", "name", "logo_uri", "created_at", "updated_at") VALUES
	('13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'Faculty of Applied Science & Technology(FAST)', NULL, '2025-11-17 17:46:41.424976+00', '2025-11-17 17:46:41.424976+00'),
	('5be014f2-5ca7-4c42-a5bb-8521c3917f6f', 'Faculty of Business & Management Studies(FBMS)', NULL, '2025-11-17 17:48:27.668289+00', '2025-11-17 17:48:37.189746+00');


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."departments" ("id", "faculty_id", "name", "logo_uri", "created_at", "updated_at") VALUES
	('d652e0d1-8422-4f7a-874b-39d761da8dd3', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'Department of Computer Science', NULL, '2025-11-17 17:49:26.13464+00', '2025-11-17 17:49:26.13464+00'),
	('1e8de0d8-9a40-4a59-9b55-da0a53376866', '5be014f2-5ca7-4c42-a5bb-8521c3917f6f', 'Department of Secretaryship', NULL, '2025-11-17 17:51:06.147547+00', '2025-11-17 17:51:06.147547+00');


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."programs" ("id", "created_at", "name", "department") VALUES
	(1, '2025-11-17 17:52:36.588163+00', 'Computer Science', 'd652e0d1-8422-4f7a-874b-39d761da8dd3'),
	(2, '2025-11-17 17:52:54.422411+00', 'Computer Networking', 'd652e0d1-8422-4f7a-874b-39d761da8dd3'),
	(3, '2025-11-17 17:53:16.536801+00', 'Secretary', '1e8de0d8-9a40-4a59-9b55-da0a53376866');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."profiles" ("id", "username", "full_name", "email", "index_number", "faculty_id", "department_id", "level", "phone", "avatar_url", "bio", "completed", "onboarding_completed_at", "created_at", "updated_at", "program_id") VALUES
	('b25d86b8-29a1-4f18-9c69-b3d9c047265e', NULL, 'Menz dom', 'tester@example.com', 'B23466789', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'd652e0d1-8422-4f7a-874b-39d761da8dd3', 300, '0245367897', NULL, NULL, true, '2025-11-18 04:21:06.16+00', '2025-11-15 00:53:22.015825+00', '2025-11-18 04:21:06.312089+00', 1),
	('d9397393-465a-4f1f-8983-b37a10d17f1b', NULL, 'Ben Ten', 'tester1@ktu.edu.gh', 'B20224106', '5be014f2-5ca7-4c42-a5bb-8521c3917f6f', '1e8de0d8-9a40-4a59-9b55-da0a53376866', 400, '0244821565', NULL, NULL, true, '2026-02-10 10:38:14.754+00', '2026-02-10 10:13:45.491054+00', '2026-02-10 10:38:14.981912+00', 3),
	('8f9936fc-e0db-48f5-a04b-b66396c9b341', NULL, 'John Doe', 'kvngnathan8420@gmail.com', 'B202245373', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'd652e0d1-8422-4f7a-874b-39d761da8dd3', 400, '0241588469', NULL, NULL, true, '2026-02-10 12:20:23.1+00', '2026-02-10 12:18:09.102587+00', '2026-02-10 12:20:23.710333+00', 1),
	('ca04ac35-df83-4bf1-ad2b-c20578d4b364', NULL, 'John Mez', 'tester3@example.com', 'B23456', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'd652e0d1-8422-4f7a-874b-39d761da8dd3', 300, '0217647845', NULL, NULL, true, '2026-02-13 23:28:09.567+00', '2026-02-13 23:27:09.363655+00', '2026-02-13 23:28:09.571319+00', 1),
	('ce2de4c6-1cdd-4ac5-ac08-e3f2cb41aecf', NULL, 'Ben Doe', 'tester4@example.com', '04/2021/234D', '5be014f2-5ca7-4c42-a5bb-8521c3917f6f', '1e8de0d8-9a40-4a59-9b55-da0a53376866', 300, '0245374856', NULL, NULL, true, '2026-02-20 22:31:54.758+00', '2026-02-20 22:30:31.79917+00', '2026-02-20 22:31:54.786159+00', 3),
	('d7cb209f-f94b-4280-9a00-fd3c4404b062', NULL, 'John Doe', 'tester5@example.com', 'B1234556', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'd652e0d1-8422-4f7a-874b-39d761da8dd3', 100, '0245378494', NULL, NULL, true, '2026-02-21 02:21:12.105+00', '2026-02-21 02:14:25.520157+00', '2026-02-21 02:21:12.127889+00', 2),
	('251bd44b-12e1-486e-bfeb-974995333677', NULL, NULL, 'tester6@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, NULL, '2026-02-21 02:23:52.893573+00', '2026-02-21 02:23:52.893573+00', NULL),
	('a1209526-1ad1-457d-9175-f4d080a594c7', NULL, 'Joe Doe', 'tester2@ktu.edu.gh', 'B202245372', '5be014f2-5ca7-4c42-a5bb-8521c3917f6f', '1e8de0d8-9a40-4a59-9b55-da0a53376866', 300, '0553243423', NULL, NULL, true, '2026-03-03 23:38:35.512+00', '2026-03-03 22:26:57.636988+00', '2026-03-03 23:38:39.920784+00', 3),
	('43b68bf0-ff0e-4580-9848-3cb8fd626881', NULL, 'benz', 'tester3@ktu.edu.gh', 'B202245374', '13160ad4-2444-4bb9-b1fe-4f701abbdfda', 'd652e0d1-8422-4f7a-874b-39d761da8dd3', 400, '0246578939', NULL, NULL, true, '2026-03-04 01:01:52.067+00', '2026-03-04 00:59:53.039778+00', '2026-03-04 01:01:56.343484+00', 1);


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."announcements" ("id", "title", "subtitle", "summary", "body", "notice", "heads_up", "category", "is_important", "pinned", "starts_at", "ends_at", "is_public", "location", "address", "contact", "quick_facts", "attachments", "author_id", "created_at", "updated_at") VALUES
	('29f85ba0-3c8b-49b3-854b-9b33256183a1', 'SRC Week – Opening Concert & Cultural Night', 'Official SRC Event | Hosted by PM', 'Celebrate SRC Week with music, dance, and culture.', 'Featuring performances from top local artists and cultural groups. Refreshments available on site.', 'Entry is free — come early for better seating!', 'Expect high winds; bring jackets and avoid light tents.', 'event', true, true, '2025-12-12 16:36:24.790565+00', '2025-12-12 19:36:24.790565+00', true, 'KTU Forecourt', 'Main Campus, KTU', '024 333 4444', '[{"label": "Venue", "value": "KTU Forecourt"}, {"label": "Access", "value": "Free Entry"}, {"label": "Security", "value": "SRC Volunteers + Campus Patrol"}]', '[{"url": "https://example.com/poster.png", "name": "Event Poster"}]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-10 16:36:24.790565+00', '2025-12-11 15:36:24.790565+00'),
	('c3ea0557-225c-4cdf-9777-dbb66e2643f9', 'Emergency: Heavy Rainfall Warning', 'Issued by KTU Safety Office', 'Students are advised to stay indoors between 4–7 PM.', 'The Ghana Meteorological Agency has issued a severe rainfall warning covering eastern regions.', 'Campus shuttles will pause during heavy rainfall.', 'Avoid low-lying areas. Stay in safe buildings only.', 'emergency', true, false, '2025-12-11 16:36:24.790565+00', '2025-12-11 21:36:24.790565+00', true, 'Campus Grounds', 'All Faculties', NULL, '[{"label": "Issued By", "value": "KTU Safety Office"}, {"label": "Status", "value": "Active"}]', '[]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-09 16:36:24.790565+00', '2025-12-11 13:36:24.790565+00'),
	('db5897c6-4f4c-4e04-9e82-3e3c98bc68ee', 'Course Registration Now Open', 'Academic Affairs Directorate', 'Registration for Semester 2 is now open to all levels.', 'Visit the student portal to complete registration before the deadline.', 'Late registration attracts penalties.', NULL, 'academic', false, false, '2025-12-11 16:36:24.790565+00', '2025-12-25 16:36:24.790565+00', true, 'Online Portal', 'portal.ktu.edu', '030 123 4567', '[{"label": "Deadline", "value": "14 days"}, {"label": "Platform", "value": "Student Portal"}]', '[]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-04 16:36:24.790565+00', '2025-12-05 16:36:24.790565+00'),
	('08623cda-b400-47c0-b6a0-3523b69760a9', 'Hostel Allocation Update', 'KTU Accommodation Office', 'New bed spaces added for Level 100 students.', 'Additional rooms have been released due to cancellations. Apply early to secure a spot.', NULL, NULL, 'administration', false, false, '2025-12-11 16:36:24.790565+00', NULL, false, 'Hostel Secretariat', 'Block A, Main Campus', '054 987 6543', '[{"label": "Available Rooms", "value": "32"}, {"label": "Priority", "value": "Level 100"}]', '[]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-08 16:36:24.790565+00', '2025-12-08 16:36:24.790565+00'),
	('597b81ff-46b2-4777-9858-5a4531d97141', 'African Cultural Exhibition', 'Faculty of Art & Design', 'Explore traditional African art, fabric, sculpture, and music.', 'The exhibition highlights Ghanaian craftsmanship with student-led demonstrations.', 'Don’t miss the live Kente weaving demo.', NULL, 'event', false, false, '2025-12-14 16:36:24.790565+00', '2025-12-14 21:36:24.790565+00', true, 'Art & Design Studio', 'Block C', NULL, '[{"label": "Exhibitors", "value": "Students & Local Artisans"}, {"label": "Entry", "value": "Free"}]', '[]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-07 16:36:24.790565+00', '2025-12-09 16:36:24.790565+00'),
	('72d4877a-68f3-420f-a0f1-916bcc3c28da', 'Library Opens 24/7 for Exam Week', 'KTU Library Directorate', 'To support exam preparation, the library will operate 24/7.', 'Ensure you carry your student ID for late-night access.', NULL, 'Be security-conscious when leaving campus late.', 'general', true, false, '2025-12-11 16:36:24.790565+00', '2025-12-18 16:36:24.790565+00', true, 'KTU Main Library', 'Next to Auditorium', NULL, '[{"label": "Access", "value": "Student ID Required"}, {"label": "Duration", "value": "1 Week"}]', '[]', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2025-12-10 16:36:24.790565+00', '2025-12-11 16:36:24.790565+00');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."events" ("id", "title", "description", "location", "is_featured", "starts_at", "ends_at", "category", "cover_image", "organizer_id", "capacity", "visibility", "created_at", "updated_at", "going_count", "interested_count", "can_book_canopy", "disable_attendance") VALUES
	('d1250721-f486-4f77-80b9-0c64f5783961', 'Health Screening Day', 'Free health checkup for all students.', 'KTU Clinic', false, '2025-12-04 23:56:03.806609+00', '2025-12-05 03:56:03.806609+00', 'health', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 500, 'public', '2025-12-03 23:56:03.806609+00', '2025-12-04 06:16:47.00488+00', 0, 0, false, true),
	('13ad014c-13f0-41be-8640-d77e85d6515d', 'Business Faculty Seminar', 'A seminar for Business students on entrepreneurship.', 'Business School Seminar Hall', true, '2025-12-10 23:56:03.806609+00', '2025-12-11 03:56:03.806609+00', 'seminar', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 400, 'scoped', '2025-12-03 23:56:03.806609+00', '2025-12-04 05:22:51.63588+00', 0, 0, false, false),
	('0413cd44-d7cc-4899-8be5-eb6998f17a11', 'SRC Leadership Dinner', 'Exclusive dinner with SRC executives and invited guests.', 'Royal Kitchen Restaurant', true, '2026-02-11 23:56:03.806609+00', '2026-02-16 01:56:03.806609+00', 'formal', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 50, 'invite_only', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:54:01.561747+00', 0, 0, false, false),
	('083e16e7-9427-40d1-9ec8-210f8d47b84c', 'Final Year Project Defense', 'Engineering students defending their final projects.', 'Engineering Block', false, '2026-02-03 23:56:03.806609+00', '2026-02-14 05:56:03.806609+00', 'academic', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 150, 'scoped', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:54:27.610003+00', 0, 0, true, false),
	('0dce88e9-8415-4358-96df-117ced061c24', 'Level 100 Orientation', 'Mandatory orientation for all first-year students.', 'Auditorium A', true, '2026-02-02 23:56:03.806609+00', '2026-02-16 02:56:03.806609+00', 'academic', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 900, 'scoped', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:54:37.297914+00', 0, 0, false, false),
	('19dac8af-3212-484f-9572-6d8d21ffc166', 'Departmental Advisory Board Meeting', 'Closed-door strategic planning meeting.', 'Administrative Block - Conference Room', true, '2026-01-02 23:56:03.806609+00', '2026-01-13 02:56:03.806609+00', 'meeting', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238
', NULL, 25, 'invite_only', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:54:45.1062+00', 0, 0, true, false),
	('1a6272d0-4f90-4ac0-ba27-7ead564b5513', 'KTU Neon Night Party', 'Glow-in-the-dark party with DJs and performances.', 'SRC Hostel Grounds', true, '2025-12-18 23:56:03.806609+00', '2026-12-19 04:56:03.806609+00', 'party', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 2000, 'public', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:54:54.002784+00', 0, 0, false, false),
	('52cd0693-b4f2-408c-b995-f4a03e7eb94f', 'Innovation & Tech Workshop', 'Hands-on workshop on emerging technologies and innovation.', 'Engineering Block - Lab 4', false, '2025-12-06 23:56:03.806609+00', '2026-12-07 01:56:03.806609+00', 'workshop', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 80, 'public', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:55:00.919198+00', 0, 0, false, false),
	('5968f1bf-07fc-455c-adcb-b0a613febac1', 'Freshers Welcome Concert', 'Kick off the semester with music, food, and fun.', 'KTU Forecourt', false, '2025-12-08 23:56:03.806609+00', '2026-12-09 03:56:03.806609+00', 'concert', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 1200, 'public', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:55:06.015084+00', 0, 0, false, false),
	('cb836cb4-8cb0-49d4-b85c-3527cc6dae6a', 'Inter-Hall Football Games', 'Battle of the halls football tournament.', 'KTU Sports Stadium', false, '2025-12-13 23:56:03.806609+00', '2026-12-14 02:56:03.806609+00', 'sports', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', NULL, 3000, 'public', '2025-12-03 23:56:03.806609+00', '2026-02-09 01:55:10.607013+00', 1, 0, false, false);


--
-- Data for Name: event_attendance; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."event_attendance" ("id", "event_id", "profile_id", "status", "created_at", "updated_at") VALUES
	('7badd428-04fd-463f-968d-d8c552176e57', 'cb836cb4-8cb0-49d4-b85c-3527cc6dae6a', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'going', '2025-12-11 14:37:56.22528+00', '2025-12-11 14:37:56.22528+00');


--
-- Data for Name: event_invites; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: event_scopes; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."feedback" ("id", "profile_id", "type", "category", "rating", "message", "is_anonymous", "created_at") VALUES
	('e3c3b3ba-aea5-47cb-9c15-8e2fbbf85c61', NULL, 'bug', 'src-services', 1, 'C,mon now do something', true, '2026-02-19 01:32:44.985029+00'),
	('03250b76-03b4-4c04-97bf-f1fdabf5a37b', NULL, 'suggestion', 'academics', NULL, 'Can you add a past questions feature', false, '2026-02-19 01:31:16.828692+00');


--
-- Data for Name: hostels; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."hostels" ("id", "name", "description", "address", "contact", "bedrooms", "bathrooms", "campus", "price", "rating", "type", "payment_term", "facilities", "hero_image_url", "agent_name", "agent_email", "agent_avatar_url", "created_at", "updated_at", "is_featured") VALUES
	('df604199-233a-4fb0-967c-86e0ec9b26c9', 'Sunset Vista Hostels', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', '123 Hostel Street, Downtown District, Accra', '+233 24 123 4567', 12, 8, false, 25.00, 4.8, 'Hostel', 'yearly', '{WiFi,Parking,Kitchen,Laundry,Lounge,"24/7 Security"}', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400', 'John Mensah', 'john.mensah@hostels.com', 'https://randomuser.me/api/portraits/men/32.jpg', '2025-11-20 11:33:38.009999+00', '2025-11-20 11:37:22.280525+00', true),
	('b486db29-a254-4791-9d13-e76f64170a9c', 'Trap House/Doe Heights', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'Dome, Accra', '+233 24 000 1111', 10, 6, false, 25.00, 4.8, 'Hostel', 'yearly', '{WiFi,Parking,Kitchen}', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', true),
	('c1353839-5869-4634-857d-5d4abd5baa4f', 'Sunrise Hostel', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'Madina, Accra', '+233 24 000 2222', 14, 8, false, 30.00, 4.5, 'Hostel', 'yearly', '{WiFi,Parking,Kitchen,Laundry}', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', false),
	('94bbbf06-f6a9-4576-bbf1-9d900666c760', 'Campus Lodge', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'East Legon, Accra', '+233 24 000 4444', 18, 12, true, 3335.00, 4.6, 'Hostel', 'academic_year', '{WiFi,Parking,Kitchen,Laundry,"24/7 Security"}', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', true),
	('ab6b2372-d5d0-4dd9-b5da-3f0974e4718d', 'Student Haven', 'Welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'Ashongman, Accra', '+233 24 000 5555', 8, 5, false, 2442.00, 4.9, 'Hostel', 'semester', '{WiFi,Kitchen,Laundry}', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', false),
	('3f50227e-d617-4c8e-a414-f6518e61fd47', 'Urban Stay', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'Legon, Accra', '+233 24 000 3333', 16, 10, true, 2108.00, 4.7, 'Hostel', 'academic_year', '{WiFi,Parking,Kitchen,Laundry,Lounge}', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', false),
	('75850764-bc6b-4d60-b741-7209ba771f93', 'Modern Living', 'Experience the perfect blend of comfort and community at Sunset Vista Hostel. Located in the heart of the city, our modern facilities and welcoming atmosphere make it the ideal choice for travelers seeking both adventure and relaxation.', 'Spintex, Accra', '+233 24 000 6666', 20, 14, false, 322.00, 4.4, 'Hostel', 'semester', '{WiFi,Parking,Kitchen,Laundry,Lounge}', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800', NULL, NULL, NULL, '2025-11-20 11:33:38.009999+00', '2025-11-20 11:47:26.061062+00', false);


--
-- Data for Name: hostel_photos; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."hostel_photos" ("id", "hostel_id", "storage_path", "caption", "is_featured", "position", "created_at") VALUES
	('7e64bdaf-2fcd-4818-8ffe-7c4ae4dcb91a', 'df604199-233a-4fb0-967c-86e0ec9b26c9', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400', 'Front view', true, 1, '2025-11-20 11:37:22.280525+00'),
	('30ad1644-66af-479a-bf38-47cde224e272', 'df604199-233a-4fb0-967c-86e0ec9b26c9', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', 'Room interior', false, 2, '2025-11-20 11:37:22.280525+00'),
	('e6635f37-dcde-4b0a-b128-256034b5fb35', 'df604199-233a-4fb0-967c-86e0ec9b26c9', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', 'Common area', false, 3, '2025-11-20 11:37:22.280525+00'),
	('526444ae-8790-4b84-b8e5-e1210a5df6b6', 'df604199-233a-4fb0-967c-86e0ec9b26c9', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 'Night view', false, 4, '2025-11-20 11:37:22.280525+00'),
	('2d5abf7a-c86c-4b56-9d93-9ca7792bfeee', 'c1353839-5869-4634-857d-5d4abd5baa4f', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 'Front view', true, 1, '2025-11-20 11:47:26.061062+00'),
	('b57efbad-1c64-48b8-92db-1a7d0982b882', 'c1353839-5869-4634-857d-5d4abd5baa4f', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'Room interior', false, 2, '2025-11-20 11:47:26.061062+00'),
	('6987dae6-b3aa-4b12-a5af-ab3a4698852a', 'c1353839-5869-4634-857d-5d4abd5baa4f', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 'Common area', false, 3, '2025-11-20 11:47:26.061062+00'),
	('76e846fa-e6c6-4d51-8b06-1f05aae14282', 'c1353839-5869-4634-857d-5d4abd5baa4f', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'Night exterior', false, 4, '2025-11-20 11:47:26.061062+00'),
	('3b850db7-5b54-4619-91bc-151f0cdf34ce', 'b486db29-a254-4791-9d13-e76f64170a9c', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'Facade at sunrise', true, 1, '2025-11-20 11:47:26.061062+00'),
	('452fbfde-ebd8-4e26-bfb0-1cd1558826f1', 'b486db29-a254-4791-9d13-e76f64170a9c', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800', 'Shared room', false, 2, '2025-11-20 11:47:26.061062+00'),
	('cd808ba8-f786-499b-8189-db99fe5e7e9c', 'b486db29-a254-4791-9d13-e76f64170a9c', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800', 'Reception', false, 3, '2025-11-20 11:47:26.061062+00'),
	('fbaaeb7d-6254-41e8-ae31-7e7154601a01', 'b486db29-a254-4791-9d13-e76f64170a9c', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800', 'Lounge area', false, 4, '2025-11-20 11:47:26.061062+00'),
	('bec1b7ac-951f-431b-b8fd-e3a68a6acd62', 'ab6b2372-d5d0-4dd9-b5da-3f0974e4718d', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 'Street view', true, 1, '2025-11-20 11:47:26.061062+00'),
	('e3d8ac40-6644-418c-903b-68e618118fa1', 'ab6b2372-d5d0-4dd9-b5da-3f0974e4718d', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800', 'Study corner', false, 2, '2025-11-20 11:47:26.061062+00'),
	('ec58940c-ff0a-47c4-82da-60148f3a901b', 'ab6b2372-d5d0-4dd9-b5da-3f0974e4718d', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800', 'Lobby', false, 3, '2025-11-20 11:47:26.061062+00'),
	('0cf1e255-eb66-452d-8c83-6dd4d24513f1', 'ab6b2372-d5d0-4dd9-b5da-3f0974e4718d', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'Night ambience', false, 4, '2025-11-20 11:47:26.061062+00'),
	('fc9461f2-c0d1-46b2-b6f0-b4ddda923d8c', '94bbbf06-f6a9-4576-bbf1-9d900666c760', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'Main entrance', true, 1, '2025-11-20 11:47:26.061062+00'),
	('c4d3dabb-c8e5-4e85-ac9d-79ceabf76b9b', '94bbbf06-f6a9-4576-bbf1-9d900666c760', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 'Double room', false, 2, '2025-11-20 11:47:26.061062+00'),
	('0a53d46c-1a21-4463-bfd7-44c25638b6b8', '94bbbf06-f6a9-4576-bbf1-9d900666c760', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'Shared kitchen', false, 3, '2025-11-20 11:47:26.061062+00'),
	('a13c50c5-3471-420e-9ae4-f9d7e100ecb0', '94bbbf06-f6a9-4576-bbf1-9d900666c760', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 'Common lounge', false, 4, '2025-11-20 11:47:26.061062+00'),
	('28529ee3-b96a-468b-8e8c-8dcc1e0b95bd', '75850764-bc6b-4d60-b741-7209ba771f93', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800', 'Cozy courtyard', true, 1, '2025-11-20 11:47:26.061062+00'),
	('f8e904f0-da5f-4056-8173-46969944bdba', '75850764-bc6b-4d60-b741-7209ba771f93', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800', 'Bunk room', false, 2, '2025-11-20 11:47:26.061062+00'),
	('7b065543-8710-4e91-ae7b-1412238a648e', '75850764-bc6b-4d60-b741-7209ba771f93', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800', 'Dining area', false, 3, '2025-11-20 11:47:26.061062+00'),
	('ffa1d24f-4292-49a0-b14f-85bf885180e7', '75850764-bc6b-4d60-b741-7209ba771f93', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'Study space', false, 4, '2025-11-20 11:47:26.061062+00'),
	('3d4e3e3e-326f-45ce-85d6-5b534b7f8c59', '3f50227e-d617-4c8e-a414-f6518e61fd47', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800', 'Facade & parking', true, 1, '2025-11-20 11:47:26.061062+00'),
	('4d7510ef-49b1-45a5-bf19-d0d7c18e1a6a', '3f50227e-d617-4c8e-a414-f6518e61fd47', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', 'Premium room', false, 2, '2025-11-20 11:47:26.061062+00'),
	('c626f4b9-f5f6-462e-a82f-2d5481228bb7', '3f50227e-d617-4c8e-a414-f6518e61fd47', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 'Shared lounge', false, 3, '2025-11-20 11:47:26.061062+00'),
	('c8c3b67f-78c0-45f2-bf4a-a10cc062c7c8', '3f50227e-d617-4c8e-a414-f6518e61fd47', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'Night lighting', false, 4, '2025-11-20 11:47:26.061062+00');


--
-- Data for Name: listing_fee_plans; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."listing_fee_plans" ("id", "name", "currency", "normal_fee", "featured_fee", "active", "created_at") VALUES
	('c091cd4f-17e4-4e12-9aec-18c999acbc52', 'default', 'GHS', 10.00, 14.00, true, '2026-02-19 09:51:18.989041+00');


--
-- Data for Name: market_categories; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."market_categories" ("id", "name", "icon", "created_at", "color") VALUES
	('36acbc98-b796-4caf-ab5f-496c8f9d992a', 'Phones', '📱', '2025-11-26 07:09:59.443411+00', '#FF6B6B'),
	('55898218-3a52-4ea1-b9ba-abdf7591f992', 'Accessories', '🎧', '2025-11-26 07:09:59.443411+00', '#4ECDC4'),
	('19bafb52-f243-47ad-9c9f-62a33b067a05', 'Groceries', '🛒', '2025-11-26 07:09:59.443411+00', '#95E1D3'),
	('599e86b1-d0fb-4ad1-9130-ecc2242e6203', 'Fashion', '👔', '2025-11-26 07:09:59.443411+00', '#F38181'),
	('0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 'Electronics', '💻', '2025-11-26 07:09:59.443411+00', '#AA96DA'),
	('72b63baf-0de2-4192-8751-9524a0b04211', 'Books', '📚', '2025-11-26 07:09:59.443411+00', '#FCBAD3'),
	('a6c99705-7c5d-4857-956d-ef536acce91a', 'Sports', '⚽', '2025-11-26 07:09:59.443411+00', '#FFD93D'),
	('3dfe8ad4-4524-4941-ab71-875a27dedb00', 'Home & Garden', '🏡', '2025-11-26 07:09:59.443411+00', '#6BCB77'),
	('27b030b1-b29c-4942-a44a-a118607f4209', 'Beauty', '💄', '2025-11-26 07:09:59.443411+00', '#FE6B8B'),
	('ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 'Toys', '🧸', '2025-11-26 07:09:59.443411+00', '#A8E6CF');


--
-- Data for Name: listing_submissions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."listing_submissions" ("id", "submitter_id", "title", "description", "price", "currency", "category_id", "stock_qty", "condition", "placement_type", "call_contact", "whatsapp_contact", "photos", "fee_plan_id", "status", "approved_by", "approved_at", "created_at", "updated_at", "reference_code") VALUES
	('4e145488-9c1c-414e-9b5a-c2a98beb44c8', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Xolace Mechs', 'This is our product', 20.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 20, 'new', 'normal', NULL, '0552187422', '["b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771501909139-0.jpg"]', NULL, 'submitted', NULL, NULL, '2026-02-19 11:51:49.717147+00', '2026-02-19 11:51:49.717147+00', NULL),
	('af3dffef-054b-4ce3-91ba-5724df92732d', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'iPhone X', 'The phone is neat', 20.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 30, 'used', 'featured', '0235463466', '0245635768', '["b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771507229114-0.jpg", "b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771507229663-1.jpg"]', 'c091cd4f-17e4-4e12-9aec-18c999acbc52', 'submitted', NULL, NULL, '2026-02-19 13:20:30.017145+00', '2026-02-19 13:20:30.017145+00', NULL),
	('75f9fa6e-91e4-47d7-840d-2248500206c0', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Boxers', 'This is a product', 100.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 30, 'new', 'featured', NULL, '0234546455', '["b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771512936682-0.jpg"]', 'c091cd4f-17e4-4e12-9aec-18c999acbc52', 'submitted', NULL, NULL, '2026-02-19 14:55:37.270133+00', '2026-02-19 14:55:37.270133+00', '75F9FA6E'),
	('3ce16ca5-7465-4a59-8b15-f49baddc3333', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Desk', 'Well the product', 200.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 100, 'new', 'featured', NULL, '0244364783', '["b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771513494833-0.jpg"]', 'c091cd4f-17e4-4e12-9aec-18c999acbc52', 'submitted', NULL, NULL, '2026-02-19 15:04:55.231625+00', '2026-02-19 15:04:55.231625+00', '3CE16CA5');


--
-- Data for Name: market_listings; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."market_listings" ("id", "seller_id", "title", "description", "price", "currency", "category_id", "stock_qty", "is_in_stock", "condition", "is_active", "is_approved", "call_contact", "whatsapp_contact", "placement_type", "is_featured", "placement_fee_paid", "placement_paid_at", "placement_fee_amount", "placement_fee_currency", "hero_image_url", "created_at", "updated_at", "rating", "rating_count") VALUES
	('97150ba0-3aff-426b-bd0a-232e6dd04d0c', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Samsung Galaxy A54 5G – 256GB', 'Brand new Samsung Galaxy A54 with 256GB storage and 8GB RAM. 1-year shop warranty.', 4200.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 5, true, 'New', true, true, '0249876543', '0249876543', 'normal', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('9dfff7f3-446c-4090-90c0-c25d32b67fa1', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Infinix Hot 30 – 128GB', 'Clean Infinix Hot 30, 128GB, dual SIM, strong battery. Perfect for students.', 2100.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 3, true, 'Used - Good', true, true, '0502223344', '0502223344', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1510265110618-2c5c4eeebb3a?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('f953b7bd-e268-4cf3-8cc8-0e5581a36aca', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Tecno Spark 10C – 64GB', 'Tecno Spark 10C, 64GB, bought a few months ago, minor scratches on back cover.', 1500.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 2, true, 'Used - Good', true, true, '0274455667', '0274455667', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('5fc1301e-941d-47f7-83b8-7b3273f84726', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'iPhone 11 64GB – White', 'Student-used iPhone 11, 64GB, Face ID working, no cracks. Includes protective case.', 3800.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 1, true, 'Used - Fair', true, true, '0591112233', '0591112233', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('e0ecbf9e-6390-466c-848c-2dfae9e60fa6', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'HP Pavilion 15” Laptop – 512GB SSD', 'HP Pavilion 15-inch, 8GB RAM, 512GB SSD. Great for design and programming.', 6500.00, 'GHS', '0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 2, true, 'Used - Like New', true, true, '0249998877', '0249998877', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('f66aae50-a588-491f-96ee-52eef495f0be', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'LG 32” Smart TV – Full HD', 'LG 32-inch smart TV with YouTube and Netflix built-in. Perfect for hostel rooms.', 2300.00, 'GHS', '0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 3, true, 'New', true, true, '0556667788', '0556667788', 'normal', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('ce210cef-0871-4d34-a47d-c01ca8d57e97', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'JBL Portable Bluetooth Speaker', 'Original JBL portable Bluetooth speaker with deep bass and long battery life.', 850.00, 'GHS', '0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 10, true, 'New', true, true, '0203344556', '0203344556', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1585386959984-a4155223f3f8?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('c6e0d62f-1ba3-403b-82fe-103b13f76908', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Canon PIXMA All-in-One Printer', 'Canon PIXMA printer for scanning, printing, and copying. Ideal for assignments & projects.', 1200.00, 'GHS', '0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 4, true, 'New', true, true, '0509988776', '0509988776', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1586486855514-95c7c903c3cc?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('b56f4d3b-d26f-4bac-8b64-4c2fb3f6c2a8', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '23.8” Full HD Monitor – HDMI', 'Slim 23.8-inch monitor with HDMI input. Perfect second screen for productivity.', 1450.00, 'GHS', '0c872c2b-5e3f-4183-b8c2-4f3b5e487209', 3, true, 'New', true, true, '0274433221', '0274433221', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('470992f6-92f6-4c1e-a111-b268a41e9132', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '25kg Bag of Jasmine Rice', 'High-quality jasmine rice, 25kg bag. Good for hostel group cooking.', 420.00, 'GHS', '19bafb52-f243-47ad-9c9f-62a33b067a05', 8, true, 'New', true, true, '0241112223', '0241112223', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('849327f5-d070-450f-b9ea-cf59f66329fa', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '5L Vegetable Cooking Oil', 'Healthy vegetable oil, 5L gallon. Suitable for cooking and frying.', 180.00, 'GHS', '19bafb52-f243-47ad-9c9f-62a33b067a05', 15, true, 'New', true, true, '0553332211', '0553332211', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('cc032ee2-741f-49f6-8aa3-4435e9459570', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Crate of Eggs (30 pcs)', 'Fresh farm eggs, one crate (30 pieces). Delivered to campus.', 55.00, 'GHS', '19bafb52-f243-47ad-9c9f-62a33b067a05', 30, true, 'New', true, true, '0506677889', '0506677889', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc2?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('188c4b78-764e-4d8c-bbe7-de27d620bac8', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Pack of Bottled Water (30 x 500ml)', 'Pack of 30 bottled water (500ml each). Great for events and hostel rooms.', 45.00, 'GHS', '19bafb52-f243-47ad-9c9f-62a33b067a05', 20, true, 'New', true, true, '0271122334', '0271122334', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('f0f7b28f-4c0d-4cb1-8962-ccacedc3dc2a', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Breakfast Combo – Cornflakes & Milk', 'Combo pack: large cornflakes and 1L powdered milk. Perfect for quick student breakfast.', 95.00, 'GHS', '19bafb52-f243-47ad-9c9f-62a33b067a05', 12, true, 'New', true, true, '0599988776', '0599988776', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('49a75e0a-820e-4779-a324-c25f366f309b', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Shea Butter Skin Care Set', 'Pure shea butter set with body cream and lip balm. Great for dry skin.', 70.00, 'GHS', '27b030b1-b29c-4942-a44a-a118607f4209', 25, true, 'New', true, true, '0247755332', '0247755332', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('7257929f-290a-4ba6-8474-a6cb6e8e4294', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Glow Body Lotion – 400ml', 'Moisturizing body lotion that leaves skin soft and glowing.', 55.00, 'GHS', '27b030b1-b29c-4942-a44a-a118607f4209', 40, true, 'New', true, true, '0502233445', '0502233445', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('26a9ef46-dbbc-49c3-af9c-806c573a613a', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Beard Oil – 50ml', 'Natural beard oil that softens and grows beard. Perfect for gents on campus.', 65.00, 'GHS', '27b030b1-b29c-4942-a44a-a118607f4209', 30, true, 'New', true, true, '0274455773', '0274455773', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('e427ed68-a50f-43d3-a6db-28e2d9a73cca', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Makeup Starter Kit', 'Beginner-friendly makeup kit with foundation, powder, and brushes.', 180.00, 'GHS', '27b030b1-b29c-4942-a44a-a118607f4209', 10, true, 'New', true, true, '0556677990', '0556677990', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('6cd85802-b312-45f0-b1c9-2cc6e6d8b2d6', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Cleansing Face Wash – 200ml', 'Gentle face wash that removes dirt and oil without drying the skin.', 45.00, 'GHS', '27b030b1-b29c-4942-a44a-a118607f4209', 20, true, 'New', true, true, '0591122334', '0591122334', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('85b2f14e-4b9d-4b96-8367-8d6b9adc012f', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2-in-1 Bedsheet & Pillowcase Set', 'Soft cotton bedsheet with two matching pillowcases. Fits standard student mattress.', 120.00, 'GHS', '3dfe8ad4-4524-4941-ab71-875a27dedb00', 15, true, 'New', true, true, '0243344556', '0243344556', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('fb65b51f-5e52-43c9-b13b-66e9e6a83618', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Study Lamp with Adjustable Neck', 'LED study lamp with adjustable neck and 3 brightness levels.', 95.00, 'GHS', '3dfe8ad4-4524-4941-ab71-875a27dedb00', 20, true, 'New', true, true, '0279988776', '0279988776', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('a8123aa3-ad93-4f33-87b0-cdbb68cd9671', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Plastic Chair (Hostel Use)', 'Durable plastic chair suitable for hostel rooms and balconies.', 85.00, 'GHS', '3dfe8ad4-4524-4941-ab71-875a27dedb00', 30, true, 'New', true, true, '0508877665', '0508877665', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('dcfeab9c-8840-42f9-b2d6-d41e1278d7a6', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Portable Standing Fan – 16"', 'Energy-efficient standing fan for hostel rooms. Adjustable height.', 380.00, 'GHS', '3dfe8ad4-4524-4941-ab71-875a27dedb00', 10, true, 'New', true, true, '0554422110', '0554422110', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('e554dc4d-03d1-490f-9db6-e95b1d0a3c0e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Laundry Basket – Medium', 'Plastic laundry basket, medium size, perfect for hostel laundry runs.', 70.00, 'GHS', '3dfe8ad4-4524-4941-ab71-875a27dedb00', 25, true, 'New', true, true, '0595544332', '0595544332', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1621609871103-30aa3c5c8a2f?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('a17c5e79-e6a6-4185-a740-af16fc78245a', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Wireless Earbuds with Charging Case', 'Noise-reducing wireless earbuds with long-lasting battery and charging case.', 230.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 20, true, 'New', true, true, '0246677889', '0246677889', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('777544e9-683e-44bc-a65d-89a6e1c41dcb', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Silicone Phone Case (iPhone 13)', 'Soft silicone case that protects your iPhone 13 from scratches and drops.', 65.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 50, true, 'New', true, true, '0506677880', '0506677880', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('d19d19dc-1009-42b8-adae-986b05f31f41', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Laptop Backpack – Water Resistant', 'Stylish and durable backpack that fits up to 15.6-inch laptops.', 220.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 18, true, 'New', true, true, '0278899001', '0278899001', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('a190ba75-fd62-4c51-8b73-522d1d2ea179', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Smartwatch Band – Black', 'Comfortable silicone band compatible with most smartwatches.', 45.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 40, true, 'New', true, true, '0205566778', '0205566778', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('24e00bfc-0618-4f36-be79-078f0566e26a', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '10,000mAh Power Bank', 'Portable power bank, 10,000mAh, charges phone 2–3 times on the go.', 160.00, 'GHS', '55898218-3a52-4ea1-b9ba-abdf7591f992', 30, true, 'New', true, true, '0592211334', '0592211334', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('6e6502f0-d6bd-4716-ae07-66516e97eb6e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Unisex Hoodie – Campus Edition', 'Comfy unisex hoodie with campus-inspired print. Perfect for chilly lecture halls.', 180.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 25, true, 'New', true, true, '0243322110', '0243322110', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('35ad393b-b745-4801-956d-594d26e9fbf2', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Slim Fit Jeans – Dark Blue', 'Slim fit jeans suitable for both casual and semi-formal looks.', 150.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 30, true, 'New', true, true, '0509998877', '0509998877', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1495121553079-4c61bcce189c?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('f14682f9-2c20-4b22-9f57-4a9f93cf9b91', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'White Graphic T-Shirt', 'Casual white tee with minimalistic graphic print.', 90.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 50, true, 'New', true, true, '0272233445', '0272233445', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('542d9b23-f18a-4d0a-af6d-3439c4caf7c3', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Ladies Floral Dress', 'Knee-length floral dress, perfect for casual outings or Sunday service.', 210.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 20, true, 'New', true, true, '0209988776', '0209988776', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('0fbe4a11-43b6-422e-b5d9-5d1a3ba78b00', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'White Sneakers – Unisex', 'Clean unisex white sneakers that go with any outfit.', 260.00, 'GHS', '599e86b1-d0fb-4ad1-9130-ecc2242e6203', 18, true, 'New', true, true, '0558877009', '0558877009', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('79657e2d-71a8-4e96-b5a8-b011f5be7d50', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Discrete Mathematics Textbook', 'Essential discrete maths textbook recommended for level 200 CS students.', 260.00, 'GHS', '72b63baf-0de2-4192-8751-9524a0b04211', 10, true, 'Used - Good', true, true, '0247788990', '0247788990', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('3f7b180f-1661-4e37-9135-1cf950165e85', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Introduction to Programming in Python', 'Beginner-friendly programming textbook with examples and exercises.', 230.00, 'GHS', '72b63baf-0de2-4192-8751-9524a0b04211', 12, true, 'Used - Like New', true, true, '0502211344', '0502211344', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('c3c0c48c-6893-427f-9af8-022c3b0cb609', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Motivational Book – “Atomic Habits”', 'Popular self-development book that helps you build better habits.', 150.00, 'GHS', '72b63baf-0de2-4192-8751-9524a0b04211', 8, true, 'Used - Like New', true, true, '0276655443', '0276655443', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('f80bf690-75e8-4150-a81b-095806aee0b4', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Notebook Pack (5pcs A4 Ruled)', 'Pack of 5 ruled A4 notebooks. Great for lecture notes.', 60.00, 'GHS', '72b63baf-0de2-4192-8751-9524a0b04211', 40, true, 'New', true, true, '0204433221', '0204433221', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('6767a497-05b0-4601-ba3b-80c7992a0c92', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Graphic Design Basics', 'Introduction to graphic design concepts, layouts, and color theory.', 180.00, 'GHS', '72b63baf-0de2-4192-8751-9524a0b04211', 6, true, 'Used - Good', true, true, '0555522334', '0555522334', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('60375c51-d3fa-42b2-b10b-bcd3244b824b', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Size 5 Football – Match Quality', 'Durable football suitable for training and friendly matches on campus.', 160.00, 'GHS', 'a6c99705-7c5d-4857-956d-ef536acce91a', 25, true, 'New', true, true, '0246611223', '0246611223', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('4f7b3881-c25d-4ee7-ab4c-ce6d76fdab4f', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Basketball – Indoor/Outdoor', 'Standard size basketball, good grip, can be used on court and concrete.', 170.00, 'GHS', 'a6c99705-7c5d-4857-956d-ef536acce91a', 18, true, 'New', true, true, '0503377889', '0503377889', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('932d3b67-ae1f-4567-8cda-d8eb541c8760', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Skipping Rope – Adjustable Length', 'Adjustable skipping rope for cardio and warm-up exercises.', 55.00, 'GHS', 'a6c99705-7c5d-4857-956d-ef536acce91a', 40, true, 'New', true, true, '0278899441', '0278899441', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1526402461234-4f3ec6c3a4f5?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('5745a9eb-b619-4798-9ca4-686a2369b5dd', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Gym Gloves – Pair', 'Padded gym gloves to protect your hands during weightlifting.', 80.00, 'GHS', 'a6c99705-7c5d-4857-956d-ef536acce91a', 20, true, 'New', true, true, '0208877665', '0208877665', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('29e8d273-9257-47c3-a09e-3717e7d74af9', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Football Jersey – Custom Name', 'Customizable football jersey with your name and favorite number.', 200.00, 'GHS', 'a6c99705-7c5d-4857-956d-ef536acce91a', 12, true, 'New', true, true, '0556677008', '0556677008', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('e8b55740-20b2-47c3-b9c6-4c84b231005d', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Plush Teddy Bear – Medium', 'Soft plush teddy bear, great as a gift or room decor.', 95.00, 'GHS', 'ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 15, true, 'New', true, true, '0245599887', '0245599887', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1501432377862-3d0432b87a14?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('35179af8-9929-4abc-bbf2-656621f5cd53', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Wooden Puzzle Set', 'Colorful wooden puzzle set for kids. Helps with learning and coordination.', 85.00, 'GHS', 'ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 20, true, 'New', true, true, '0506677123', '0506677123', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1596464716127-f216969c9c88?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('20f1fd4e-7315-4979-b6b6-dd701ebd2b22', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Toy Car Set (5pcs)', 'Set of 5 mini toy cars, durable and fun to play with.', 70.00, 'GHS', 'ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 25, true, 'New', true, true, '0276655990', '0276655990', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1596464716127-f216969c9c88?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('c2355142-5059-47b5-8fb8-db506596c2d7', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Building Blocks – 100pcs', 'Colorful building blocks set for creative play.', 120.00, 'GHS', 'ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 18, true, 'New', true, true, '0209988123', '0209988123', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('95136b94-fe95-46d2-9105-e2f84c5f94f7', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'Colouring Book & Crayons Set', 'Children’s colouring book with 24-piece crayon set.', 60.00, 'GHS', 'ccf1f9ec-367e-4c50-9ba6-d24bd128a38d', 30, true, 'New', true, true, '0554322110', '0554322110', 'normal', false, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 07:44:36.654958+00', 0.00, 0),
	('92484dc0-ab5c-4f91-9171-5234843dde53', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'iPhone 13 Pro 128GB – Sierra Blue', 'Neatly used iPhone 13 Pro, 128GB storage, great battery health. Comes with box and charger.', 7800.00, 'GHS', '36acbc98-b796-4caf-ab5f-496c8f9d992a', 1, true, 'Used - Like New', true, true, '0551234567', '0551234567', 'featured', true, false, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', '2025-11-26 07:44:36.654958+00', '2025-11-26 12:32:51.586256+00', 0.00, 0);


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: listing_payments; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: market_listing_variants; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."market_listing_variants" ("id", "listing_id", "label", "sku", "price", "currency", "stock_qty", "is_in_stock", "attributes", "is_active", "created_at", "updated_at") VALUES
	('8f44798e-ce05-43e8-b1b4-2b248443f596', '92484dc0-ab5c-4f91-9171-5234843dde53', '128GB – Sierra Blue', 'IP13P-128-SBLUE-USED', NULL, NULL, 1, true, '{"color": "Sierra Blue", "storage": "128GB", "condition": "Used - Like New"}', true, '2025-11-26 11:45:49.90833+00', '2025-11-26 11:45:49.90833+00'),
	('6913456e-7b3e-433d-b76c-c250ce630f68', '92484dc0-ab5c-4f91-9171-5234843dde53', '256GB – Graphite', 'IP13P-256-GRAPH-USED', 8200.00, 'GHS', 1, true, '{"color": "Graphite", "storage": "256GB", "condition": "Used - Very Good"}', true, '2025-11-26 11:45:49.90833+00', '2025-11-26 11:45:49.90833+00'),
	('8b4a8cab-17e7-4e83-b84d-4d6ccd8fab38', '92484dc0-ab5c-4f91-9171-5234843dde53', '512GB – Gold', 'IP13P-512-GOLD-USED', 8900.00, 'GHS', 1, true, '{"color": "Gold", "storage": "512GB", "condition": "Used - Very Good"}', true, '2025-11-26 11:45:49.90833+00', '2025-11-26 11:45:49.90833+00');


--
-- Data for Name: market_photos; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."market_photos" ("id", "listing_id", "storage_path", "caption", "is_featured", "position", "created_at") VALUES
	('90ffd342-6467-4846-8317-8b5e76936cd5', '92484dc0-ab5c-4f91-9171-5234843dde53', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'iPhone 13 Pro 128GB – Sierra Blue', true, 1, '2025-11-26 12:27:16.873428+00'),
	('eaa9d8b1-f137-4079-b0f0-97c594586dd0', '92484dc0-ab5c-4f91-9171-5234843dde53', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'iPhone 13 Pro 128GB – Sierra Blue', false, 2, '2025-11-26 12:32:51.586256+00');


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."news" ("id", "title", "body", "excerpt", "author_id", "publisher", "publisher_image", "category", "source", "cover_image", "is_draft", "published_at", "created_at") VALUES
	('caa76898-ffc5-4201-9506-eb1f9210b454', 'SRC Organizes Career Development Seminar for Students', '## Career Development Seminar

The **Student Representative Council (SRC)** is organizing a career development seminar aimed at preparing students for life after university.

### Seminar Topics
- CV and cover letter writing  
- Interview preparation  
- Workplace ethics and professionalism  

### Why You Should Attend
This seminar is designed to give students **practical, real-world insights** from industry professionals.

📍 **Venue:** SRC Auditorium  
🕒 **Time:** 10:00 AM sharp  

All students are encouraged to attend.', 'SRC to host a career development seminar focused on preparing students for life after university.', NULL, 'KTU SRC', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 'Events', 'SRC Office', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', false, '2026-02-08 22:55:38.202632+00', '2026-02-08 22:55:38.202632+00'),
	('24761784-2ad4-4dbc-8d39-81c3888de102', 'KTU Sports Team Qualifies for Inter-University Finals', '## KTU Advances to the Finals 🏆

The **KTU sports team** has qualified for the finals of the **Inter-University Games** after an impressive semi-final performance.

### Match Highlights
- Strong defensive coordination  
- Excellent teamwork  
- Outstanding discipline on the field  

> The finals promise to be an exciting encounter.

Students are encouraged to come out in large numbers to **support the team** and show school pride.', 'KTU sports team secures a spot in the Inter-University Games finals.', NULL, 'KTU Sports Committee', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 'Sports', 'KTU Sports Directorate', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', false, '2026-02-08 22:55:38.202632+00', '2026-02-08 22:55:38.202632+00'),
	('12f298d8-908c-4a46-8fd9-9a1ddc0817a0', 'Library Extends Opening Hours Ahead of Exams', '## Extended Library Hours 📚

In preparation for the upcoming examinations, the **KTU Library** has announced extended opening hours to support students.

### New Opening Hours
- **Monday – Sunday:** 7:00 AM – 11:00 PM  

This initiative is to ensure students have **adequate time and a conducive environment** to study.

Please observe library rules and maintain a quiet atmosphere at all times.', 'KTU library extends its opening hours to support students during exam period.', NULL, 'KTU Library', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'Campus', 'KTU Library Services', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', false, '2026-02-08 22:55:38.202632+00', '2026-02-08 22:55:38.202632+00'),
	('d1119b39-3497-4657-9e5e-fc6e48c3f35f', 'KTU Announces Mid-Semester Examination Timetable', '## Mid-Semester Examination Timetable Released

The management of **Koforidua Technical University (KTU)** has officially released the mid-semester examination timetable for the **2025 academic year**.

### Important Notes for Students
- Carefully check your examination dates and times  
- Confirm your examination venues early  
- Arrive at least **30 minutes before** your scheduled paper  

> Students with timetable clashes or concerns should contact their **department office immediately**.

We wish all students the very best in their preparations.', 'The official mid-semester examination timetable for the 2025 academic year has been released.', NULL, 'KTU SRC', 'https://example.com/src-logo.png', 'Academics', 'KTU Administration', 'https://example.com/exam-timetable-cover.jpg', false, '2026-02-08 22:55:38.202632+00', '2026-02-08 22:55:38.202632+00');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."notifications" ("id", "recipient_id", "actor_id", "type", "title", "body", "data", "link_type", "link_id", "read", "created_at") VALUES
	('e76ca5ad-7c88-4b45-956d-2f492b414e95', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'payment', 'Receipt Ready', 'Your transaction receipt is now available.', '{"receipt_url": "https://ktu.edu/receipt/001"}', 'payment', NULL, true, '2025-12-09 21:30:43.964046+00'),
	('a06229db-f988-4a76-873e-7ec5f23b1efc', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'announcement', 'Library Opens 24/7', 'For exam week only.', '{"announcement_id": "597b81ff-46b2-4777-9858-5a4531d97141"}', 'announcement', '597b81ff-46b2-4777-9858-5a4531d97141', false, '2025-12-08 21:30:43.964046+00'),
	('dbb03ace-0a39-4d9a-9e1a-e38cb42341d4', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'event', 'Event Starts in 1 Hour', 'SRC Opening Concert at KTU Forecourt.', '{"event_id": "0dce88e9-8415-4358-96df-117ced061c24"}', 'event', '0dce88e9-8415-4358-96df-117ced061c24', false, '2025-12-11 21:10:43.964046+00'),
	('7eb0d3a1-2e4b-4aba-9efb-da924888cf02', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'payment', 'Payment Failed', 'Your MTN Mobile Money payment was not completed.', '{"failed_reason": "insufficient_funds"}', 'payment', NULL, true, '2025-12-11 21:00:43.964046+00'),
	('da050877-4eee-4727-9b74-7b7d6e82b2f6', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'payment', 'Payment Successful', 'You successfully paid the voting fee.', '{"payment_id": "pay-001"}', 'payment', NULL, true, '2025-12-11 21:20:43.964046+00'),
	('466e8cce-b490-491b-b325-77f722d65245', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'announcement', 'New Hostel Guidelines Released', NULL, '{"announcement_id": "29f85ba0-3c8b-49b3-854b-9b33256183a1"}', 'announcement', '29f85ba0-3c8b-49b3-854b-9b33256183a1', false, '2025-12-10 21:30:43.964046+00'),
	('293a555a-7731-433e-8aac-31ccde12daf9', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'event', 'Event Updated', 'Venue changed to Engineering Block.', '{"event_id": "083e16e7-9427-40d1-9ec8-210f8d47b84c"}', 'event', '083e16e7-9427-40d1-9ec8-210f8d47b84c', false, '2025-12-09 21:30:43.964046+00'),
	('d7e8a300-c2ea-4364-8704-2dbb75b1f1b4', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'announcement', 'SRC Week Begins Today', 'Tap to view all scheduled activities.', '{"announcement_id": "08623cda-b400-47c0-b6a0-3523b69760a9"}', 'announcement', '08623cda-b400-47c0-b6a0-3523b69760a9', false, '2025-12-11 17:30:43.964046+00'),
	('f9cf1fd8-1077-4f6b-aa5b-bf6f97d782eb', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', 'event', 'You marked “Going”', 'We will remind you 10 minutes before it starts.', '{"event_id": "0413cd44-d7cc-4899-8be5-eb6998f17a11"}', 'event', '0413cd44-d7cc-4899-8be5-eb6998f17a11', false, '2025-12-11 09:30:43.964046+00');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."projects" ("id", "created_at", "name", "progress", "gradient_colors") VALUES
	('4d4f5148-c8b8-4c81-b86c-2745b1a73eb7', '2026-02-18 17:48:12.591186+00', 'App development', 80, '{#3c87f7,#6366f1}'),
	('b7bcd55a-d209-4030-a639-c8c5c2110536', '2026-02-18 17:58:00.833764+00', 'Bus Shuttle Agenda', 50, '{#667eea,#764ba2}'),
	('128566a8-574b-45c6-8ded-a72e688963d9', '2026-02-18 17:47:57.198159+00', 'Wifi Expansion', 20, '{#43e97b,#38f9d7}'),
	('0753f9cf-2a89-4974-b3c3-71727676215e', '2026-02-18 17:48:29.764117+00', 'Bus Purchase', 90, '{#667eea,#764ba2}');


--
-- Data for Name: spotlights; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."spotlights" ("id", "title", "description", "type", "submitter_name", "submitter_avatar_url", "submitter_initials", "link_url", "gradient_colors", "is_active", "starts_at", "ends_at", "created_at") VALUES
	('a6d20b4e-1fcd-4c6a-9982-121fbfb28284', 'Xolace Ambassadors', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard
   - dummy text ever since the 1500s.', 'platform', 'Xolace Inc', NULL, 'XO', 'https://xolaceinc.com', '{#3c87f7,#6366f1}', true, '2026-02-19 00:25:06+00', '2026-02-28 00:25:09+00', '2026-02-19 00:25:19.250568+00');


--
-- Data for Name: temp_representatives; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."temp_representatives" ("id", "name", "position", "bio", "image_url", "display_order", "created_at") VALUES
	('14dbab17-4713-4de8-9884-30c9f56f3aec', 'STACY BENSON', 'S.R.C President', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard
   - dummy text ever since the 1500s.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 1, '2026-02-19 00:56:49.018408+00'),
	('8f970c51-25fd-4eaf-95db-64a597e3cb06', 'JAMES WILSON', 'Vice President', 'Dedicated to serving the student community with integrity and passion. Working together to create positive change and m
         -eaningful experiences for all students.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 2, '2026-02-19 00:57:33.279841+00'),
	('795a73d6-f990-4e10-a99f-f31cb6b9b008', 'SARAH JOHNSON', 'General Secretary', 'Committed to transparency and effective communication. Ensuring that every student voice is heard and represented in ou
         -r decision-making processes.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', 3, '2026-02-19 00:58:16.14858+00'),
	('af019921-773b-4cf6-ad81-28311c9e0fe9', 'MICHAEL CHEN', 'Financial Secretary', 'Managing student funds with accountability and precision. Dedicated to ensuring financial transparency and responsible
         -resource allocation.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', 4, '2026-02-19 00:58:57.269961+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('developer-credit', 'developer-credit', NULL, '2026-02-18 18:40:37.652996+00', '2026-02-18 18:40:37.652996+00', true, false, NULL, NULL, NULL, 'STANDARD'),
	('market-submissions', 'market-submissions', NULL, '2026-02-19 09:56:47.718388+00', '2026-02-19 09:56:47.718388+00', false, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('34e776bf-30fe-4142-a926-23fefcd57735', 'developer-credit', 'prosper.jpg', NULL, '2026-02-18 18:41:38.904441+00', '2026-02-18 18:41:38.904441+00', '2026-02-18 18:41:38.904441+00', '{"eTag": "\"223a61376602be168637fd1eb6b1a60f\"", "size": 4771271, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:41:38.688Z", "contentLength": 4771271, "httpStatusCode": 200}', 'b86fcbab-0067-44b2-848b-09779aca5179', NULL, NULL),
	('4cd17b4e-469a-432c-afb3-698277a73553', 'developer-credit', 'major.png', NULL, '2026-02-18 18:46:11.027088+00', '2026-02-18 18:46:11.027088+00', '2026-02-18 18:46:11.027088+00', '{"eTag": "\"b14749b220632ac701ab62e13921294c\"", "size": 1020996, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:46:11.012Z", "contentLength": 1020996, "httpStatusCode": 200}', 'e03775ca-0d15-4406-b908-34ab5b7bb19c', NULL, NULL),
	('8f36254e-597d-4297-807a-7d1940fa2bc0', 'developer-credit', 'Nathan.JPG', NULL, '2026-02-18 18:53:10.223922+00', '2026-02-18 18:53:10.223922+00', '2026-02-18 18:53:10.223922+00', '{"eTag": "\"5c58cf3bd81f1e08186abbdb111bdb4e\"", "size": 10880476, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:53:10.035Z", "contentLength": 10880476, "httpStatusCode": 200}', '90051e15-9415-4159-929d-43723a6be5f3', NULL, NULL),
	('04455eb7-3855-40d1-b05f-538ba5885ce2', 'developer-credit', 'Nathan-mini.jpeg', NULL, '2026-02-18 18:53:44.539937+00', '2026-02-18 18:53:44.539937+00', '2026-02-18 18:53:44.539937+00', '{"eTag": "\"0edc7a4d94fca07d4a0740fe41a6bb9a\"", "size": 88050, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:53:44.529Z", "contentLength": 88050, "httpStatusCode": 200}', 'd846f404-e67a-4c8c-b0aa-86c08a647f25', NULL, NULL),
	('e4e262eb-90d2-4b27-9e59-85d9115502c5', 'developer-credit', 'kwame.jpeg', NULL, '2026-02-18 18:54:59.739467+00', '2026-02-18 18:54:59.739467+00', '2026-02-18 18:54:59.739467+00', '{"eTag": "\"30123dd3480068f2ed8a2797fbdcb476\"", "size": 98160, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:54:59.731Z", "contentLength": 98160, "httpStatusCode": 200}', '77ae895b-dda3-423b-a522-206bf58e5321', NULL, NULL),
	('0fc27586-9ca8-4641-86f7-e1c9fc4b9049', 'developer-credit', 'kobby.jpg', NULL, '2026-02-18 18:59:22.240427+00', '2026-02-18 18:59:22.240427+00', '2026-02-18 18:59:22.240427+00', '{"eTag": "\"554d376c9373a6c0ce774b30c4a47273\"", "size": 12287229, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-18T18:59:22.029Z", "contentLength": 12287229, "httpStatusCode": 200}', '18ccab90-a044-4e29-88ca-d86e3290b931', NULL, NULL),
	('42bfe087-7413-4222-ab45-ce535b7a080f', 'market-submissions', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771501909139-0.jpg', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2026-02-19 11:51:49.398341+00', '2026-02-19 11:51:49.398341+00', '2026-02-19 11:51:49.398341+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-19T11:51:49.390Z", "contentLength": 0, "httpStatusCode": 200}', 'b5ca6cfa-706d-4271-952b-611cb22e6fa2', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{}'),
	('2f44e1f9-c93c-47bb-ba4c-b2f4b4eef1d6', 'market-submissions', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771507229114-0.jpg', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2026-02-19 13:20:29.621735+00', '2026-02-19 13:20:29.621735+00', '2026-02-19 13:20:29.621735+00', '{"eTag": "\"852ee636e37d7d55e453d47d995dcb33\"", "size": 298490, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-19T13:20:29.597Z", "contentLength": 298490, "httpStatusCode": 200}', '7ab55525-d648-4c6c-b905-41503c578886', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{}'),
	('b67df470-0cfa-4ec1-94f2-dac5b1b3602b', 'market-submissions', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771507229663-1.jpg', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2026-02-19 13:20:29.779066+00', '2026-02-19 13:20:29.779066+00', '2026-02-19 13:20:29.779066+00', '{"eTag": "\"060369895e999af77131325db3b3db58\"", "size": 203078, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-19T13:20:29.777Z", "contentLength": 203078, "httpStatusCode": 200}', 'eff05b23-2a1d-40e1-add8-82913fc13f7f', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{}'),
	('4009c31c-333f-4251-bb47-386c76f1936e', 'market-submissions', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771512936682-0.jpg', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2026-02-19 14:55:36.986906+00', '2026-02-19 14:55:36.986906+00', '2026-02-19 14:55:36.986906+00', '{"eTag": "\"1ed23b78ffcc0ce8b717dcb54f14dae8\"", "size": 406134, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-19T14:55:36.959Z", "contentLength": 406134, "httpStatusCode": 200}', 'bd51d9d8-566a-4f54-bb1f-161968041a4e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{}'),
	('d23e6a68-2ed8-4baf-a8cd-84432e70d66f', 'market-submissions', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e/1771513494833-0.jpg', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '2026-02-19 15:04:55.122543+00', '2026-02-19 15:04:55.122543+00', '2026-02-19 15:04:55.122543+00', '{"eTag": "\"a2e10ca52a5033b69a538a1f73d84a14\"", "size": 203078, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-02-19T15:04:55.108Z", "contentLength": 203078, "httpStatusCode": 200}', '1064c38a-8877-4f70-b8b1-0b5d2315211e', 'b25d86b8-29a1-4f18-9c69-b3d9c047265e', '{}');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 217, true);


--
-- Name: programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('"public"."programs_id_seq"', 3, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict khEdZC35wV4hSRJS4zxHZEzUZX8zWVNlY5mPyXLsv9dRkbUKw9ZHQyE6NG97zdr

RESET ALL;
