INSERT INTO public.user_credential (id, answer, created_at, email, last_modified_at, password, role, security_question) VALUES ('c2159a3e-f231-4508-9827-76505bfe7a3d', 'rick', '2024-09-17 10:38:12.444771', 'chathura@middleware.lk', null, '$2a$10$pBSZxOTh2LEQhq1Ins6eOOEIFP7logf780nSsGzBN7ngl.SbP/kEi', 'ROLE_CUSTOMER', 'Nick name?');
INSERT INTO public.user_credential (id, answer, created_at, email, last_modified_at, password, role, security_question) VALUES ('ff06efa3-559a-4e52-9824-9fc79cc7bb8d', 'rick', '2024-09-17 10:38:39.220593', 'lakshan@middleware.lk', null, '$2a$10$ns7gHuVgAdUx7hF.viespukB6U44He.W7UIIjhloF5xiWN.Iw8WUC', 'ROLE_CUSTOMER', 'Nick name?');
INSERT INTO public.user_credential (id, answer, created_at, email, last_modified_at, password, role, security_question) VALUES ('2bbfb4b4-e624-4eb6-8f47-c1f2ff8bdfa6', 'rick', '2024-09-17 10:38:48.062935', 'john@middleware.lk', null, '$2a$10$2rfcDDbMmDp1GOx0y0TLcOTTl5LBguxdrE0WJP8iEGV/dlluOuwZK', 'ROLE_CUSTOMER', 'Nick name?');

INSERT INTO public.customer (customer_id, first_name, last_name, mobile_number, user_id) VALUES ('77e2b964-e723-4351-9511-900b9b913555', 'chathura', 'lakshan', '0771234567', 'c2159a3e-f231-4508-9827-76505bfe7a3d');
INSERT INTO public.customer (customer_id, first_name, last_name, mobile_number, user_id) VALUES ('1ce8c6ca-d3d7-4396-a94c-5dea61a6fdd9', 'chathura', 'lakshan', '0711234567', 'ff06efa3-559a-4e52-9824-9fc79cc7bb8d');
INSERT INTO public.customer (customer_id, first_name, last_name, mobile_number, user_id) VALUES ('6ada0197-08ab-4479-ae04-46d3ef8a1f6b', 'chathura', 'lakshan', '0701234567', '2bbfb4b4-e624-4eb6-8f47-c1f2ff8bdfa6');


INSERT INTO public.bill_account (bill_acc_id, current_balance, last_modified_at, mobile_number, status) VALUES ('0421d586-9c61-41d2-bbb2-2b50858952c5', 600, null, '0771234567', 'ACTIVE');
INSERT INTO public.bill_account (bill_acc_id, current_balance, last_modified_at, mobile_number, status) VALUES ('bf36df81-b56d-4776-ae73-fd44f1e4d8ea', 300, null, '0701234567', 'ACTIVE');
INSERT INTO public.bill_account (bill_acc_id, current_balance, last_modified_at, mobile_number, status) VALUES ('f07380f7-f2b8-454a-9147-7de036656794', 2200, null, '0711234567', 'ACTIVE');

INSERT INTO public.bill (bill_id, amount, billing_period_end, billing_period_start, issued_at, status, bill_acc_id, payment_id) VALUES ('436e31fa-70ac-4a08-a5a2-4771ad080e57', 520, '2024-08-31', '2024-08-01', null, 'PENDING', '0421d586-9c61-41d2-bbb2-2b50858952c5', null);
INSERT INTO public.bill (bill_id, amount, billing_period_end, billing_period_start, issued_at, status, bill_acc_id, payment_id) VALUES ('b4caafaf-2ef6-4a28-b08a-bbdb21d93452', 80, '2024-07-31', '2024-07-01', null, 'PENDING', '0421d586-9c61-41d2-bbb2-2b50858952c5', null);
INSERT INTO public.bill (bill_id, amount, billing_period_end, billing_period_start, issued_at, status, bill_acc_id, payment_id) VALUES ('e9db1c2e-4211-4795-b20c-0443fbe9d1ea', 100, '2024-07-31', '2024-07-01', null, 'PAID', 'bf36df81-b56d-4776-ae73-fd44f1e4d8ea', null);
INSERT INTO public.bill (bill_id, amount, billing_period_end, billing_period_start, issued_at, status, bill_acc_id, payment_id) VALUES ('a6bf5abc-d4e7-4ab2-a210-b7cd4dca13a1', 200, '2024-08-31', '2024-08-01', null, 'PENDING', 'bf36df81-b56d-4776-ae73-fd44f1e4d8ea', null);
INSERT INTO public.bill (bill_id, amount, billing_period_end, billing_period_start, issued_at, status, bill_acc_id, payment_id) VALUES ('3e52f170-c937-4089-8f21-223a8a2a8beb', 200, '2024-08-31', '2024-08-01', null, 'PENDING', 'f07380f7-f2b8-454a-9147-7de036656794', null);

INSERT INTO ringing_tone (ringing_tone_id, artist, name)
VALUES
    (1, 'Namal Rajapaksa', 'Song for Nation'),
    (2, 'Gotabaya Rajapaksa', 'Future Hope'),
    (3, 'Maithripala Sirisena', 'Visionary Path'),
    (4, 'Sajith Premadasa', 'Rise Together'),
    (5, 'Ranil Wickremesinghe', 'Unity for Progress');