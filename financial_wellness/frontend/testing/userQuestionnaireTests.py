import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import time

class QuestionnaireTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/login")
        self.timeout = 10

    def checkElementExists(self, elementName, errorMessage=None):
        if errorMessage == None:
            try:
                element_present = EC.presence_of_element_located((By.ID, elementName))
                WebDriverWait(self.driver, self.timeout).until(element_present)
            except TimeoutException:
                print("Timed out waiting for page to load")
        else:
            try:
                element_present = EC.presence_of_element_located((By.ID, elementName))
                WebDriverWait(self.driver, self.timeout).until(element_present)
            except TimeoutException:
                raise Exception(errorMessage)
        
    def checkElementDoesNotExist(self, elementName):
        element_present = EC.presence_of_element_located((By.ID, elementName))
        if element_present:
            raise Exception('Element '+elementName+' was not expected to appear.')


    def fillSelectElement(self, elementName, value):
        self.checkElementExists(elementName)
        select = Select(self.driver.find_element_by_id(elementName))
        select.select_by_value(value)

    def fillTextElement(self, elementName, value):
        self.checkElementExists(elementName)
        element = self.driver.find_element_by_id(elementName)
        element.clear()
        element.send_keys(str(value))
        return element

    def fillNumberElement(self, elementName, value):
        return self.fillTextElement(elementName, value)

    def confirmElement(self, elementName, value):
        self.checkElementExists(elementName)
        element = self.driver.find_element_by_id(elementName)
        if type(value) == int:
            try:
                if int(element.get_attribute('value')) != value:
                    raise Exception("Displayed value does not match expected value.")
            except ValueError:
                if float(element.get_attribute('value')) != value:
                    raise Exception("Displayed value does not match expected value.")

        elif type(value) == float:
            if float(element.get_attribute('value')) != value:
                raise Exception("Displayed value does not match expected value.")
        else:
            if element.get_attribute('value') != value:
                raise Exception("Displayed value does not match expected value.")

    def clickButton(self, buttonName):
        self.checkElementExists(buttonName)
        self.driver.find_element_by_id(buttonName).click()

    def logIn(self):
        # Enter Dashboard
        self.fillTextElement('emailInput', 'kvnguyen@ualberta.ca')
        passwordInput = self.fillTextElement('passwordInput', 'asdf')
        passwordInput.send_keys(Keys.RETURN)
        time.sleep(2)
        
    def enterQuestionnaire(self):
        # Enter Questionnaire
        self.driver.get("http://localhost:3000/questionnaire")

        # Check arrived at personal section of Questionnaire
        self.checkElementExists('personalSection')

    def exitQuestionnaire(self):
        self.clickButton('exitButton')
        self.clickButton('leaveButton')

    def buttonNavigation(self, buttonName, target):
        # Click on Button
        self.clickButton(buttonName)

        # Check arrived at target section of Questionnaire
        self.checkElementExists(target+'Section', "Could not navigate to "+target.capitalize()+" Section of Questionnaire.")

    def fillSection(self, inputs):
        # fills a section of the questionnaire based on values given in inputs
        # inputs should look like as follows:
        # [[elementName1, elementType1, elementValue1], 
        #   ..., 
        #  [elementNameN, elementTypeN, elementValueN]]
        # elementType must be 'select', 'text'

        for i in inputs:
            elementName = i[0]
            elementType = i[1]
            elementValue = i[2]

            if elementType == 'select':
                self.fillSelectElement(elementName, elementValue)
            elif elementType == 'text':
                self.fillTextElement(elementName, elementValue)
            elif elementType == 'number':
                self.fillNumberElement(elementName, elementValue)

    def addSubSections(self, inputs):
        for i in inputs:
            name = i[0]
            self.checkElementExists('type')
            self.fillSelectElement('type', name)

    def fillSubSections(self, inputs):
        for i in inputs:
            name = i[0]
            inputsAtName = i[1]
            self.fillSection(inputsAtName)

    def removeSubSections(self, inputs, clear=False):
        time.sleep(0.1)
        if not clear:
            for i in inputs:
                name = i[0]
                self.clickButton(name+'RemoveButton')
                self.checkElementDoesNotExist(name+'RemoveButton')
        else:
            ids = self.driver.find_elements_by_xpath('//*[@id]')
            elementIds = []
            for ii in ids:
                #print ii.tag_name
                elementId = [ii.get_attribute('id')][0]
                if 'RemoveButton' in elementId:
                    elementIds.append(elementId)
            for name in elementIds:
                self.clickButton(name)

    def confirmSection(self, validationInputs):
        for i in validationInputs:
            elementName = i[0]
            elementType = i[1]
            elementValue = i[2]
            
            self.confirmElement(elementName, elementValue)
 

    def confirmSubSections(self, inputs):
        for i in inputs:
            name = i[0]
            inputsAtName = i[1]
            self.confirmSection(inputsAtName)


    def test(self):
        personalSectionInputs = [['fin_goal', 'select', 'DF'], 
                                ['province', 'select', 'AB'], 
                                ['city', 'text', 'Edmonton'], 
                                ['marital_status', 'select', 'WI'], 
                                ['number_of_children', 'select', '5']]

        mindsetSectionInputs = [['stress', 'select', 'NE'], 
                                ['feeling', 'select', 'SR'], 
                                ['risk_tol', 'select', 'CO'], 
                                ['willingness', 'select', 'NA']]

        accountsSectionInputs = [['OT', [
                                ['OTValue', 'number', 599]]]]

        assetsSectionInputs = [['H',[
                                ['HValue', 'number', 59999]]]]
        
        debtSectionInputs = [['PE', [
                            ['PETotal', 'number', 999], 
                            ['PERate', 'number', 0.5], 
                            ['PEMonthly', 'number', 60]]]]

        incomeSectionInputs = [['total_income', 'number', 5000]]

        insuranceSectionInputs = [['LI', [
                                ['LIPolicy', 'select', 'WL'], 
                                ['LIAmount', 'number', 500], 
                                ['LIPremium', 'number', 100]]]]

        miscSectionInputs = [['budget', 'select', 'true'], 
                            ['weekly_finance_check', 'select', 'false'], 
                            ['monthly_finance_check', 'select', 'true'], 
                            ['automated_savings', 'select', 'false'], 
                            ['automated_bills', 'select', 'true'], 
                            ['household_inventory', 'select', 'false'], 
                            ['financial_holdings_inventory', 'select', 'true'], 
                            ['review_beneficiaries', 'select', 'false'], 
                            ['old_paperwork', 'select', 'true'], 
                            ['organized_documents', 'select', 'false'], 
                            ['updated_will', 'select', 'true'], 
                            ['personal_directive', 'select', 'false'], 
                            ['power_attorney', 'select', 'true'], 
                            ['credit_report', 'select', 'false'], 
                            ['credit_score', 'select', 'true'], 
                            ['overwhelmed', 'select', 'false'],
                            ['pass_manager', 'select', 'true']]

        self.logIn()
        self.enterQuestionnaire()

        self.fillSection(personalSectionInputs)

        self.buttonNavigation('navbarMindsetButton', 'mindset')
        self.fillSection(mindsetSectionInputs)

        self.buttonNavigation('navbarAccountsButton', 'accounts')
        self.removeSubSections(None, clear=True)
        self.addSubSections(accountsSectionInputs)
        self.fillSubSections(accountsSectionInputs)

        self.buttonNavigation('navbarAssetsButton', 'assets')
        self.removeSubSections(None, clear=True)
        self.addSubSections(assetsSectionInputs)
        self.fillSubSections(assetsSectionInputs)
        
        self.buttonNavigation('navbarDebtButton', 'debt')
        self.removeSubSections(None, clear=True)
        self.addSubSections(debtSectionInputs)
        self.fillSubSections(debtSectionInputs)
        
        self.buttonNavigation('navbarIncomeButton', 'income')
        self.fillSection(incomeSectionInputs)

        self.buttonNavigation('navbarInsuranceButton', 'insurance')
        self.removeSubSections(None, clear=True)
        self.addSubSections(insuranceSectionInputs)
        self.fillSubSections(insuranceSectionInputs)

        self.buttonNavigation('navbarMiscButton', 'misc')
        self.fillSection(miscSectionInputs)

        self.buttonNavigation('navbarPersonalButton', 'personal')

        self.exitQuestionnaire()
        self.enterQuestionnaire()

        self.confirmSection(personalSectionInputs)

        self.buttonNavigation('nextButton', 'mindset')
        self.confirmSection(mindsetSectionInputs)

        self.buttonNavigation('nextButton', 'accounts')
        self.confirmSubSections(accountsSectionInputs)

        self.buttonNavigation('nextButton', 'assets')
        self.confirmSubSections(assetsSectionInputs)

        self.buttonNavigation('nextButton', 'debt')
        self.confirmSubSections(debtSectionInputs)

        self.buttonNavigation('nextButton', 'income')
        self.confirmSection(incomeSectionInputs)

        self.buttonNavigation('nextButton', 'insurance')
        self.confirmSubSections(insuranceSectionInputs)

        self.buttonNavigation('nextButton', 'misc')
        self.confirmSection(miscSectionInputs)

        # self.buttonNavigation('prevButton', 'misc')

        # self.buttonNavigation('prevButton', 'insurance')   

        # self.buttonNavigation('prevButton', 'income')

        # self.buttonNavigation('prevButton', 'debt')

        # self.buttonNavigation('prevButton', 'assets') 

        # self.buttonNavigation('prevButton', 'accounts') 
       
        # self.buttonNavigation('prevButton', 'mindset')

        # while True:
        #     pass



    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
