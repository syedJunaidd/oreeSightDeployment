import jpype
import jpype.imports
from jpype.types import *
from collections import defaultdict
# import java.lang
import sys


# Launch the JVM
jpype.startJVM(jpype.getDefaultJVMPath(), "-ea")
from java.lang import *

# jpype.addClassPath("mpxj-9.0.0.jar")
# jpype.addClassPath("poi-5.0.0.jar")
# jpype.addClassPath("commons-math3-3.6.1.jar")
# jpype.addClassPath("commons-collections4-4.4.jar")
# jpype.addClassPath("jcl-over-slf4j-1.7.30.jar")
# jpype.addClassPath("slf4j-api-1.7.30.jar")
# jpype.addClassPath("SparseBitSet-1.2.jar")
# jpype.addClassPath("commons-codec-1.15.jar")
# jpype.addClassPath("rtfparserkit-1.16.0.jar")
# jpype.addClassPath("jaxb-api-2.3.1.jar")
jpype.addClassPath("./*")


from net.sf.mpxj.primavera import PrimaveraPMFileWriter
from net.sf.mpxj import ProjectFile
from net.sf.mpxj.reader import ProjectReader
from net.sf.mpxj.reader import ProjectReaderUtility
from net.sf.mpxj.writer import ProjectWriter
from net.sf.mpxj.writer import ProjectWriterUtility
from net.sf.mpxj.mspdi import MSPDIWriter
from net.sf.mpxj.mspdi import SaveVersion

def convert(inputFile, outputFile):
#    try:
    #print(inputFile, outputFile)
    reader = ProjectReaderUtility.getProjectReader(inputFile)
    project = ProjectFile()
    project = reader.read(inputFile)
    #writer = ProjectWriter
    #writer = ProjectWriterUtility.getProjectWriter(outputFile)
    writer = MSPDIWriter()
    writer.write(project, outputFile)
    print(0)
#    except:
#        print(0)
# convert("sample.mpp", "hassan.json")

#if __name__ == "__main__":
inputFile = None
outputFile = None
inp = False
out = False
for i, arg in enumerate(sys.argv):
    if arg == "-i":
        inp = True
    elif inp:
        inp = False
        inputFile = arg
    elif arg == "-o":
        out = True
    elif out:
        out=False
        outputFile=arg
if inputFile and outputFile:
    #print("converting " + inputFile + " to " + outputFile)
    convert(inputFile, outputFile)
else:
    print("please specify input and output files")