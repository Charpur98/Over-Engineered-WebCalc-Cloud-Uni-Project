import smtplib
import ssl

port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = "charpware@gmail.com"  # Enter your address
receiver_email = "charpware@gmail.com"  # Enter receiver address
password = "Charpassword123"
message = """\
Subject: [AUTO-MAIL] A test failed! 

A test failed on http://monitoring.40174730.qpc.hal.davecutting.uk/ """

context = ssl.create_default_context()
with smtplib.SMTP_SSL(smtp_server, port) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message)
    server.quit()
