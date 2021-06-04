NC='\033[0m' # No Color
cd ./angular-components
printf "${NC}"

osascript -e "
    tell application \"Google Chrome\"
        set windowList to every window
        repeat with aWindow in windowList
            set tabList to every tab of aWindow
            repeat with atab in tabList
                if (URL of atab contains \"localhost\") then
                    tell atab 
                        execute javascript \"console.warn('Some files has changed; reloading start!')\"
                    end tell
                end if
            end repeat
        end repeat
    end tell
"

ng build angular-components --prod --output-hashing=none

osascript -e "
    tell application \"Google Chrome\"
	set windowList to every window
	repeat with aWindow in windowList
		set tabList to every tab of aWindow
		repeat with atab in tabList
			if (URL of atab contains \"localhost\") then
				tell atab to reload
			end if
		end repeat
	end repeat
    end tell
"

printf "\n"