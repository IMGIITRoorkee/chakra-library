# Structure

### **Container (Types)**
    - FullWidthContainer
    - HalfWidthContainer
    - SixtyFourtyContainer
    - NinetyTenContainer

### **Container (Possible Children)**
    - Title
    - Description
    - FlexBox
    - Link
    - List
    - Slider
    - Table
    - Image
    - Tab
    - Divider

### **FullWidthContainer (Possible Children)**
    - Header
    - Footer
    - Container (Technically all containers fit in a FullWidthContainer)

### **SixtyFortyContainer (Possible Children)**
    - Card (e.g QuoteCard, ContactUs card etc)
    - IFrame

### **HalfWidthContainer (Possible Children)**
    - IFrame


### **List (Type)**
    - BulletedList
    - NumberedList
    - PublicationList

### **List (Possible Children)**
    - Title
    - ListItem
    - Accordian
    - Divider

### **ListItem (Types)**
    - NumberedItem
    - PublicationItem (ref - Pg 40 of wireframes pdf)
    - BulletItem
    - ProjectItem


### **ListItem (Possible Children)**
    - List

### **Description (Types)** (Description can be left/center aligned, pass alignment as an attrib in XML)
    - TextDescription
    - LinkDescription

### **Flexbox (Possible Children)**
    - Card
    - Image (image, alt-text)

### **Card (Types)**
    - DescriptionCard (title, desc, link)
    - CompleteInfoCard (title, subtitle, desc, link)
    - IconCard (icon, desc)
    - NumberedCard (title, desc, number)
    - ProfCard (image, name, designation, num, institute webmail, addr)
    - ContactCard  (Name, number, email)
    - ImageCard (image, title, link)
    - StatsCard (icon, title, subtitle)


### **Tab (Possible Children)** (Attr - with-border)
    - TabItem

### **TabItem (Possible Children)** (attr - title)
    - Container

### **Image** (attr - image, alt-text)

### **Table (Possible Children)** (attr - column-names)
    - TableRow

### **TableRow (Possible Children)**
    - TableValue

### **TableValue**
    - Description

### **Slider (Possible Children)**
    - Card

### **Link (Types)** (attr - link)
    - TextLink
    - Button
    - MultiButton (attr- secondary_link)

### **Accordian (Types)** (attr - Title)
    - ImageAccordian (attr- image)

### **Accordian (Possible Children)**
    - Container

