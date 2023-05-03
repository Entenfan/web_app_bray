Hallo,
Inhalte, was ich gemacht habe:
- In Account habe ich für mich probiert, Text aus dem Login-Textfeld zu nehmen (wird später für SQL-Injection verwendet)
- Eine Main.js, mit der man einen Webserver auf Port 8080 laufen lassen kann (CSS-Stylesheets werden noch nicht geladen, deswegen siehts whack aus, aber in IntelliJ kann man sich eine funktionelle Vorschau der Seiten anschauen, wenn man in der HTML-File ist)
- defaultData.sql ist eine kleine SQL Datei, die man einfach in einer MySQL Workbench laufen lassen kann, um die zu hackenden Daten zu kreieren (muss dann auf in der VirtualBox gestartet sein für die ova)
- Es wäre gut, alle Scripts im js/ Ordner zu haben, auf die Schnelle habe ich noch nciht rausgefunden wie man die Funktionalität von den HTML verlinkt

Zu tun:
- [ ] Inhalte des Logins in eine Basic SQL Abfrage einbauen (Ohne Inhaltvalidierung)
- Seite Bauen/Verarbeiten, die bei eingeloggtem Admin-User eine Suchleiste anbietet (Für Script-Injection)
- Alles für ova